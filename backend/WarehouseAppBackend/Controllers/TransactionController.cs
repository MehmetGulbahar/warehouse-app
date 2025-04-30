using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WarehouseAppBackend.Models;
using WarehouseAppBackend.Services.Interfaces;

namespace WarehouseAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Transaction>>> GetAllTransactions()
        {
            try
            {
                var transactions = await _transactionService.GetAllTransactionsAsync();
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransactionById(string id)
        {
            try
            {
                var transaction = await _transactionService.GetTransactionByIdAsync(id);
                if (transaction == null)
                {
                    return NotFound(new { message = "Transaction not found" });
                }
                return Ok(transaction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("product/{productId}")]
        public async Task<ActionResult<List<Transaction>>> GetTransactionsByProductId(string productId)
        {
            try
            {
                var transactions = await _transactionService.GetTransactionsByProductIdAsync(productId);
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Transaction>> CreateTransaction([FromBody] Transaction transaction)
        {
            try
            {
                if (transaction == null)
                {
                    return BadRequest(new { message = "Transaction data cannot be empty" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdTransaction = await _transactionService.CreateTransactionAsync(transaction);
                return CreatedAtAction(nameof(GetTransactionById), new { id = createdTransaction.Id }, createdTransaction);
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

        [HttpPut("{id}")]
        public async Task<ActionResult<Transaction>> UpdateTransaction(string id, [FromBody] Transaction transaction)
        {
            try
            {
                if (id != transaction.Id)
                {
                    return BadRequest(new { message = "ID mismatch" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updatedTransaction = await _transactionService.UpdateTransactionAsync(transaction);
                if (updatedTransaction == null)
                {
                    return NotFound(new { message = "Transaction not found" });
                }
                return Ok(updatedTransaction);
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
        public async Task<ActionResult> DeleteTransaction(string id)
        {
            try
            {
                var result = await _transactionService.DeleteTransactionAsync(id);
                if (!result)
                {
                    return NotFound(new { message = "Transaction not found" });
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<Transaction>>> SearchTransactions(
            [FromQuery] string productId = null,
            [FromQuery] string type = null,
            [FromQuery] string status = null)
        {
            try
            {
                var transactions = await _transactionService.SearchTransactionsAsync(productId, type, status);
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }
        
        [HttpGet("summary")]
        public async Task<ActionResult<Dictionary<string, int>>> GetStockSummary()
        {
            try
            {
                var summary = await _transactionService.GetStockSummaryAsync();
                return Ok(summary);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }
    }
}
