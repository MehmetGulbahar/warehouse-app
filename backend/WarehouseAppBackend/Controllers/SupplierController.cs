using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WarehouseAppBackend.Models;
using WarehouseAppBackend.Services;

namespace WarehouseAppBackend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Supplier>>> GetAllSuppliers()
        {
            var suppliers = await _supplierService.GetAllSuppliersAsync();
            return Ok(suppliers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSupplierById(Guid id)
        {
            var supplier = await _supplierService.GetSupplierByIdAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }
            return Ok(supplier);
        }

        [HttpPost]
        public async Task<ActionResult<Supplier>> CreateSupplier(Supplier supplier)
        {
            var createdSupplier = await _supplierService.CreateSupplierAsync(supplier);
            return CreatedAtAction(nameof(GetSupplierById), new { id = createdSupplier.Id }, createdSupplier);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Supplier>> UpdateSupplier(Guid id, Supplier supplier)
        {
            try
            {
                var updatedSupplier = await _supplierService.UpdateSupplierAsync(id, supplier);
                return Ok(updatedSupplier);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(Guid id)
        {
            var result = await _supplierService.DeleteSupplierAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<Supplier>>> SearchSuppliers([FromQuery] string? searchTerm, [FromQuery] string? status)
        {
            var suppliers = await _supplierService.SearchSuppliersAsync(searchTerm ?? "", status ?? "all");
            return Ok(suppliers);
        }
    }
}