var builder = DistributedApplication.CreateBuilder(args);

// Phase 0 TODO: declare the resource graph, e.g.
//
//   var postgres = builder.AddPostgres("postgres")
//                         .WithImage("pgvector/pgvector", "pg17");
//   var db       = postgres.AddDatabase("copilotinterview");
//   var redis    = builder.AddRedis("redis");
//
//   builder.AddProject<Projects.CopilotInterview_Api>("api")
//          .WithReference(db)
//          .WithReference(redis);
//
//   builder.AddNpmApp("frontend", "../../../frontend");

builder.Build().Run();
