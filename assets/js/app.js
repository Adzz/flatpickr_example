// We import the CSS which is extracted to its own file by esbuild.
// Remove this line if you add a your own CSS build pipeline (e.g postcss).
import "../css/app.css"

// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "./vendor/some-package.js"
//
// Alternatively, you can `npm install some-package` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "flatpickr/dist/flatpickr.css";

import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import {Socket} from "phoenix"
import {LiveSocket} from "phoenix_live_view"
import topbar from "../vendor/topbar"
import flatpickr from "flatpickr";

const Pickr = {
  mounted() {
    // NOTE! If you are using a custom format then flatpickr swaps out the inputs. To
    // make this play nice with phoenix forms you'll need to ignore updates to the field
    // EXAMPLE:

    // </.form :let={f} for={@changeset}>
      // <%= label f, :the_date, "Submitted To Airline At" %>
      // <div phx-update="ignore" phx-hook="Pickr" id="my_id" date-format="F j, Y H:i">
          //   ^^^^^^^^^^^^^^                      ^^^^^^^^^
          //      Important                    hooks need an ID

      //   <%= text_input f, :the_date, data_input: true, class: "form-control", phx_debounce: "blur" %>
      // </div>
    // </.form>

    const altFormat = this.el.getAttribute("date-format");
    const opts = {altFormat: altFormat, altInputClass: "", altInput: true};
    const altOptions = altFormat ? opts : {}

    this.pickr = flatpickr(this.el, {
      ...altOptions,
      allowInput: true,
      dateFormat: "Z",
      enableTime: true,
      time_24hr: true,
      wrap: true,
      onClose(selectedDates, dateStr, instance) {
        // This ensures we blur the field when the date window closes.
        instance.input.dispatchEvent(new Event("blur", {bubbles: true}))
      }
    });
  },
};

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {params: {_csrf_token: csrfToken}, hooks: { Pickr: Pickr }})

// Show progress bar on live navigation and form submits
topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"})
window.addEventListener("phx:page-loading-start", info => topbar.show())
window.addEventListener("phx:page-loading-stop", info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket
