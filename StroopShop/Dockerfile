FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["StroopShop/StroopShop.csproj", "StroopShop/"]
RUN dotnet restore "StroopShop/StroopShop.csproj"
COPY . .
WORKDIR "/src/StroopShop"
RUN dotnet build "StroopShop.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StroopShop.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StroopShop.dll"]
