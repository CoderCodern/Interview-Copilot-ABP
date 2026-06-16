var builder = WebApplication.CreateBuilder(args);

// Phase 0 TODO: builder.AddServiceDefaults();                  // OTel, health, resilience, discovery
// Phase 0 TODO: builder.Services.AddApplication();             // slices, validators, pipeline behaviors
// Phase 0 TODO: builder.Services.AddInfrastructure(builder.Configuration); // EF Core, Redis, identity, jobs
// Phase 0 TODO: builder.Services.AddAiPlatform(builder.Configuration);     // providers, registry, prompts, metering
// Phase 0 TODO: builder.Services.AddApiServices();             // auth, OpenAPI, problem-details, CORS, rate limiting

var app = builder.Build();

// Phase 0 TODO: app.MapDefaultEndpoints();                     // /health, /alive
// Phase 0 TODO: map feature endpoint groups (Endpoints/) here.

app.Run();
