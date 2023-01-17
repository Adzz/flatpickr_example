import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :flatpickr_example, FlatpickrExample.Repo,
  username: "postgres",
  password: "postgres",
  database: "flatpickr_example_test#{System.get_env("MIX_TEST_PARTITION")}",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :flatpickr_example, FlatpickrExampleWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "FZH71tQ/KqhER6+7du8ga6rQavn91xHBHUZfU+T44imB27y9JoHtgzhan3CPcoCk",
  server: false

# In test we don't send emails.
config :flatpickr_example, FlatpickrExample.Mailer, adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
