using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//CORS
builder.Services.AddCors(Options =>
{
    Options.AddPolicy("ActivarCors", app =>
    {
        app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});



// Enable CORS policy
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowMyOrigin",
//        builder => builder.WithOrigins("http://localhost:3000")
//                           .AllowAnyMethod()
//                           .AllowAnyHeader());
//});

// Use the CORS policy
//app.UseCors("AllowMyOrigin");
IServiceCollection serviceCollection = builder.Services.Configure<Microsoft.AspNetCore.Mvc.ApiBehaviorOptions>(options =>
{
    options.SuppressConsumesConstraintForFormFileParameters = true;
    options.SuppressInferBindingSourcesForParameters = true;
    options.SuppressModelStateInvalidFilter = true;
});

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors("ActivarCors");
app.UseAuthorization();

app.MapControllers();

app.Run();
