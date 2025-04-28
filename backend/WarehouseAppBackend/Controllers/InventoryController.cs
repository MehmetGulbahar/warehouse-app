using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WarehouseAppBackend.Models;
using WarehouseAppBackend.Services.Interfaces;
using System.Text.Json;
using System.Linq;

namespace WarehouseAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<InventoryItem>>> GetAllItems()
        {
            try
            {
                var items = await _inventoryService.GetAllItemsAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryItem>> GetItemById(string id)
        {
            try
            {
                var item = await _inventoryService.GetItemByIdAsync(id);
                if (item == null)
                {
                    return NotFound();
                }
                return Ok(item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<InventoryItem>> CreateItem([FromBody] InventoryItem item)
        {
            try
            {
                Console.WriteLine($"Received item: {System.Text.Json.JsonSerializer.Serialize(item)}");

                if (item == null)
                {
                    return BadRequest(new { message = "Product information cannot be empty" });
                }

                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToList();

                    return BadRequest(new { message = "Validation errors", errors = errors });
                }

                var createdItem = await _inventoryService.CreateItemAsync(item);
                return CreatedAtAction(nameof(GetItemById), new { id = createdItem.Id }, createdItem);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Server error: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<InventoryItem>> UpdateItem(string id, [FromBody] InventoryItem item)
        {
            try
            {
                if (id != item.Id)
                {
                    return BadRequest(new { message = "ID mismatch" });
                }

                var existingItem = await _inventoryService.GetItemByIdAsync(id);
                if (existingItem == null)
                {
                    return NotFound(new { message = "Item not found" });
                }

                var updatedItem = await _inventoryService.UpdateItemAsync(item, existingItem);
                return Ok(updatedItem);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(string id)
        {
            try
            {
                var result = await _inventoryService.DeleteItemAsync(id);
                if (!result)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<InventoryItem>>> SearchItems(
            [FromQuery] string searchTerm = null,
            [FromQuery] string category = null,
            [FromQuery] string supplier = null,
            [FromQuery] string status = null)
        {
            try
            {
                var items = await _inventoryService.SearchItemsAsync(searchTerm, category, supplier, status);
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("totalstock")]
        public async Task<ActionResult<int>> GetTotalStockCount()
        {
            try
            {
                var totalStock = await _inventoryService.GetTotalStockCountAsync();
                return Ok(new { totalStock });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }
    }
}