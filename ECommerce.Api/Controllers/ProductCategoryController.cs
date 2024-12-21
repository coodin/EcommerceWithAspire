using E_Commerce_API.Dto.ProductCategory;
using E_Commerce_Data.Contexts;
using E_Commerce_Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce_API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ProductCategoryController(DataContext dataContext) : ControllerBase
{

    private readonly DataContext _dataContext = dataContext;

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAllCategories(
        [FromQuery] string? lastIdQuery, [FromQuery] string? direction)
    {


        if (string.IsNullOrEmpty(lastIdQuery))
        {
            try
            {
                var firsCategories = await _dataContext.ProductCategories
                        .AsNoTracking()
                        .OrderByDescending(b => b.Created)
                        .ThenByDescending(b => b.Id)
                        .Take(10)
                        .ToListAsync();
                return new OkObjectResult(new { message = $"First Categories ", firsCategories });
            }
            catch (Exception ex)
            {
                return BadRequest(
                     new { message = $"An exception has been generated for first categories ", ex }
                     );
            }
        }

        if (Guid.TryParse(lastIdQuery, out Guid lastId) && !string.IsNullOrEmpty(direction))
        {
            List<ProductCategory>? categories = null;

            try
            {
                var lastRecord = await _dataContext.ProductCategories.SingleAsync(category => category.Id == lastId);
                if (direction == "next")
                {
                    categories = await _dataContext.ProductCategories
                            .AsNoTracking()
                            .OrderByDescending(b => b.Created)
                            .ThenByDescending(b => b.Id)
                            .Where(b =>
                             b.Created > lastRecord.Created ||
               (b.Created == lastRecord.Created && b.Id.CompareTo(lastRecord.Id) > 0))
                            .Take(10)
                            .ToListAsync();
                }
                if (direction == "prev")
                {
                    categories = await _dataContext.ProductCategories
                           .AsNoTracking()
                           .OrderByDescending(b => b.Created)
                           .ThenByDescending(b => b.Id)
                           .Where(b =>
                            b.Created < lastRecord.Created ||
              (b.Created == lastRecord.Created && lastRecord.Id.CompareTo(b.Id) > 0))
                           .Take(10)
                           .ToListAsync();
                }


                return Ok(
                    new { message = $"The categories", categories });
            }
            catch (Exception ex)
            {
                {
                    return BadRequest(
                        new { message = $"An exception has been generated ", ex });
                }
            }
        }
        return new NotFoundObjectResult(
                   new { message = $"There is no lastId or direction value " });
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOneProductCategories([FromRoute] Guid id)
    {
        ProductCategory? productCategory = null;
        try
        {
            productCategory = await _dataContext.ProductCategories
            .AsNoTracking()
            //.OrderByDescending(b => b.Created)
            //.ThenByDescending(b => b.Id)
            // .OrderBy(b => b.Id)
            .Include(category => category.categories)
            .Include(category => category.parentCategory)
            .SingleOrDefaultAsync(category => category.Id == id);
        }
        catch (Exception ex)
        {

            return BadRequest(
                   new { message = $"An unintended exception has been generated ", ex }
                   );
        }

        if (productCategory == null)
        {
            return NotFound($"There is no category related with that ID:{id}");
        }

        return Ok(new { message = $"One Category has been found ", productCategory });
    }

    [HttpPost]
    public async Task<IActionResult> CreateProductCategory([FromBody] CreateProductCategoryDTO createProductCategory)
    {

        var category = new ProductCategory
        {
            CategoryName = createProductCategory.CategoryName,
            CategoryDescription = createProductCategory.CategoryDescription,
            CategoryImage = createProductCategory.CategoryImage,
            parentCategoryId = createProductCategory.parentCategoryId
        };

        try
        {
            _dataContext.ProductCategories.Add(category);
            await _dataContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = "Unintendet error has happened", ex });
        }

        return Created(
            $"/api/v1/ProductCategory",
            new { message = $"One Category has been created", category }
            );

    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateProductCategory([FromBody] UpdateProductCategoryDTO updateProductCategory, [FromRoute] Guid id)
    {
        ProductCategory? category = null;
        try
        {
            category = await _dataContext.ProductCategories.SingleOrDefaultAsync(c => c.Id == id);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = "Unintendet error has happened", ex });
        }


        if (category == null)
        {
            return NotFound(new { message = $"There is no category related with that ID:{id}" });
        }

        category.CategoryName = updateProductCategory.CategoryName ?? category.CategoryName;
        category.CategoryImage = updateProductCategory.CategoryImage ?? category.CategoryImage;
        category.CategoryDescription = updateProductCategory.CategoryDescription ?? category.CategoryDescription;
        category.parentCategoryId = updateProductCategory.parentCategoryId ?? category.parentCategoryId;
        try
        {
            await _dataContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = "Unintendet error has happened", ex });
        }

        return Ok(new { message = $"One Category has been updated ID:", category.Id });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
    {
        ProductCategory? category = null;
        try
        {
            category = await _dataContext.ProductCategories.SingleOrDefaultAsync(c => c.Id == id);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = "Unintendet error has happened", ex });
        }

        if (category == null)
        {
            return NotFound(new { message = $"There is no category related with that ID:{id}" });
        }
        _dataContext.ProductCategories.Remove(category);

        try
        {
            await _dataContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = "Unintendet error has happened", ex });
        }


        return Ok(new { message = $"One Category has been deleted", category });
    }
    [HttpDelete]
    public async Task<IActionResult> DeleteAllProducts()
    {
        var count = await _dataContext.ProductCategories.ExecuteDeleteAsync();
        return Ok(new { message = $"All Categories has been deleted count:{count}" });
    }
}
