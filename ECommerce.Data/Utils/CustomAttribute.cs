using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_Data.Utils
{
    [AttributeUsage(AttributeTargets.Property)]
    public class CreatedAttribute : Attribute { }

    [AttributeUsage(AttributeTargets.Property)]
    public class UpdatedAttribute : Attribute { }
}
