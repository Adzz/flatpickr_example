defmodule FlatpickrExampleWeb.PageController do
  use FlatpickrExampleWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
