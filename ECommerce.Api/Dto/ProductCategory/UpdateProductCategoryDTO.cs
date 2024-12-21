namespace E_Commerce_API.Dto.ProductCategory
{
    public class UpdateProductCategoryDTO
    {

        public string? CategoryName { get; set; }

        public string? CategoryImage { get; set; }

        public string? CategoryDescription { get; set; }
        public Guid? parentCategoryId { get; set; }
    }
}
