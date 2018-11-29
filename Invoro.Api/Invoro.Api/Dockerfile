FROM microsoft/dotnet:2.1-aspnetcore-runtime-nanoserver-1709 AS base
WORKDIR /app
EXPOSE 35318
EXPOSE 44369

FROM microsoft/dotnet:2.1-sdk-nanoserver-1709 AS build
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
