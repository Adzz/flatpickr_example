defmodule FlatpickrExampleWeb.HomeLive do
  use FlatpickrExampleWeb, :live_view
  use Phoenix.HTML
  require Logger

  defmodule Form do
    use Ecto.Schema

    embedded_schema do
      field(:datetime, :utc_datetime)
    end
  end

  @impl true
  def mount(_params, _session, socket) do
    assigns = %{
      changeset: Ecto.Changeset.change(%Form{}, %{})
    }
    {:ok, assign(socket, assigns)}
  end

  @impl true
  def handle_event("submit", %{"form" => params}, socket) do
    params |> IO.inspect(limit: :infinity, label: "params")
    new_assigns = %{
      changeset: Ecto.Changeset.change(%Form{}, %{})
    }
    {:noreply, assign(socket, new_assigns)}
  end

  @impl true
  def handle_event(event, params, socket) do
    Logger.error("Unhandled event triggered: #{event} with params: #{inspect(params)}")
    {:noreply, socket}
  end
end
