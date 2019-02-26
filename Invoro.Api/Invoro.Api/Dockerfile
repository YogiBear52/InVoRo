FROM microsoft/dotnet:2.2-aspnetcore-runtime-alpine AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY Invoro.Api/Invoro.Api.csproj Invoro.Api/
RUN dotnet restore Invoro.Api/Invoro.Api.csproj
COPY . .
WORKDIR /src/Invoro.Api
RUN dotnet build Invoro.Api.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Invoro.Api.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Invoro.Api.dll"]
