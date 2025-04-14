# Base image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

# SDK image for build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Sadece .csproj dosyasını kopyala ve restore yap
COPY WarehouseAppBackend/WarehouseAppBackend.csproj WarehouseAppBackend/
RUN dotnet restore "WarehouseAppBackend/WarehouseAppBackend.csproj"

# Geri kalan tüm kodları kopyala
COPY WarehouseAppBackend/. ./WarehouseAppBackend/
WORKDIR /src/WarehouseAppBackend

# Build aşaması
RUN dotnet build "WarehouseAppBackend.csproj" -c Release -o /app/build

# Publish aşaması
FROM build AS publish
RUN dotnet publish "WarehouseAppBackend.csproj" -c Release -o /app/publish

# Final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WarehouseAppBackend.dll"]