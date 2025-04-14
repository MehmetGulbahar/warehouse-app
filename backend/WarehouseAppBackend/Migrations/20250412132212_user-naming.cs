using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WarehouseAppBackend.Migrations
{
    /// <inheritdoc />
    public partial class usernaming : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AdiSoyadi",
                table: "AspNetUsers",
                newName: "NameSurname");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NameSurname",
                table: "AspNetUsers",
                newName: "AdiSoyadi");
        }
    }
}
