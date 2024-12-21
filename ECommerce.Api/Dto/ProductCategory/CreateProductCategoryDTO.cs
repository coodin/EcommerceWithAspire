using System.ComponentModel.DataAnnotations;

namespace E_Commerce_API.Dto.ProductCategory
{
    public class CreateProductCategoryDTO
    {
        [Required(ErrorMessage = "CategoryName is reqired")]
        public required string CategoryName { get; set; }
        [Required(ErrorMessage = "CategoryImage is reqired")]
        public required string CategoryImage { get; set; }
        [Required(ErrorMessage = "CategoryDescription is reqired")]
        public required string CategoryDescription { get; set; }
        public Guid? parentCategoryId { get; set; }
        //public ICollection<ProductCategory>? categories { get; set; }
    }
}
