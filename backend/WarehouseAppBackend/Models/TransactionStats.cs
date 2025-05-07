using System;

namespace WarehouseAppBackend.Models
{
    public class PeriodStats
    {
        public decimal TotalValue { get; set; }
        public int TransactionCount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class TransactionStats
    {
        public PeriodStats CurrentPeriod { get; set; }
        public PeriodStats PreviousPeriod { get; set; }
        public decimal ChangePercentage { get; set; }
        public string Trend => ChangePercentage >= 0 ? "up" : "down";

        public TransactionStats()
        {
            CurrentPeriod = new PeriodStats();
            PreviousPeriod = new PeriodStats();
        }
    }
}