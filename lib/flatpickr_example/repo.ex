defmodule FlatpickrExample.Repo do
  use Ecto.Repo,
    otp_app: :flatpickr_example,
    adapter: Ecto.Adapters.Postgres
end
