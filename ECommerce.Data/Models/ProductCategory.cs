
using E_Commerce_Data.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_Data.Models
{
    [Index(nameof(Created), nameof(Id), AllDescending = true, Name = "IX_Created_Id_Desc")]
    [Index(nameof(Created), nameof(Id), IsDescending = [false, false], Name = "IX_Created_Id_Asc")]
    public class ProductCategory
    {
        [Key]
        public Guid Id { get; set; }
        public required string CategoryName { get; set; }
        public required string CategoryImage { get; set; }
        public required string CategoryDescription { get; set; }

        //[JsonIgnore]
        public Guid? parentCategoryId { get; set; } // Optional foreign key property

        public ProductCategory? parentCategory { get; set; } // Optional reference navigation to principal

        public ICollection<ProductCategory> categories { get; } = new List<ProductCategory>();

        [Created]
        public DateTime? Created { get; set; }

        [Updated]
        public DateTime? Updated { get; set; }
    }
}
