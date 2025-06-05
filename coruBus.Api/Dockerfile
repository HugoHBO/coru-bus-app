# Etapa 1: build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

# Copiar csproj y restaurar dependencias
COPY *.csproj ./
RUN dotnet restore

# Copiar todo el código y publicar en modo Release
COPY . ./
RUN dotnet publish -c Release -o out

# Etapa 2: runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

# Copiar la aplicación publicada
COPY --from=build /app/out ./

# Exponer el puerto 5234 (donde escucha tu app)
EXPOSE 5234

# Ejecutar la app
ENTRYPOINT ["dotnet", "coruBus.Api.dll"]
