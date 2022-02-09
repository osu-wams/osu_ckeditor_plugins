(function($) {
  CKEDITOR.dialog.add("osu_buttonsDialog", function(editor) {
    const editorId = CKEDITOR.currentInstance.name;

    let buttonText = "Button Text";
    let buttonSize = "";
    let buttonColor = "btn-primary";
    let buttonLink = "";
    let buttonLinkTarget = "_blank";
    let buttonHtml = "";

    function preview() {
      $(`#${editorId} #selected-button`).empty();

      let buttonOptions = "btn";

      if (buttonSize) {
        buttonOptions += ` ${buttonSize}`;
      }

      if (buttonColor) {
        buttonOptions += ` ${buttonColor}`;
      }

      let btnText = buttonText;
      if (buttonHtml) {
        btnText = buttonHtml + buttonText;
      }

      $(`#${editorId} #selected-button`).append(
        `<button disabled class="${buttonOptions}">${btnText}</button>`
      );
    }

    function loadEvents() {
      const selection = editor.getSelection();
      const element = selection.getStartElement();
      const e = element.$;

      // If editor selection is a link...
      if (e.tagName === "A") {
        // Set button text to the link text
        buttonText = e.innerText.trim();
        const re = new RegExp(buttonText, "im");
        buttonHtml = e.innerHTML.replace(re, "");
        $(`#${editorId} #button-text`).val(buttonText);

        // Set link to the link href
        buttonLink = e.href;

        buttonLinkTarget = e.target || "_blank";
      }

      // Button Text
      const buttonTextInput = $(`#${editorId} #button-text`);
      buttonTextInput.keyup(() => {
        buttonText = buttonTextInput.val();
        preview();
      });

      // Button Color
      const colors = $(`#${editorId} .osu-colors p`);
      colors.click(function(e) {
        buttonColor =
          e.currentTarget.className === "default"
            ? "btn"
            : `btn-${e.currentTarget.className}`;
        $(colors).removeClass("color-active");
        $(this).addClass("color-active");
        preview();
      });

      // Button Size
      const buttonSizes = $(`#${editorId} .button-sizes a`);
      buttonSizes.click(function(e) {
        buttonSize = e.currentTarget.id || "";
        $(buttonSizes).removeClass("size-active");
        $(this).addClass("size-active");
        preview();
      });

      preview();
    }

    const form = `
    <form id="${editorId}" class="osu-buttons">
      <div id="selected-button"></div>
      
      <div class="button-text">
        <label>Enter button text</label><br/>
        <input id="button-text" type="text" placeholder="Button Text">
      </div>
      
      <div class="osu-colors">
        <label>Choose a color</label>
        <p class="primary"></p>
        <p class="secondary"></p>
        <p class="danger"></p>
        <p class="warning"></p>
        <p class="info"></p>
        <p class="success"></p>
        <p class="stratosphere"></p>
        <p class="moondust"></p>
        <p class="reindeer-moss"></p>
        <p class="default"></p>
      </div>
      
      <div class="button-sizes">
        <label>Choose a size</label><br/>
        <a id="btn-mini" class="btn btn-mini">Mini</a>
        <a id="btn-small" class="btn btn-small">Small</a>
        <a class="btn">Default</a>
        <a id="btn-large" class="btn btn-large">Large</a>
      </div>
    </form>
    `;

    return {
      title: "OSU Button Picker",
      midWidth: 600,
      minHeight: 300,
      contents: [
        {
          id: "tab-basic",
          label: "Basic Settings",
          elements: [
            {
              type: "html",
              id: "osu_button_tabs",
              html: form,
              onLoad: loadEvents
            }
          ]
        }
      ],
      onShow() {
        this.insertMode = true;
        loadEvents();
      },
      onOk() {
        const selection = editor.getSelection();
        const element = selection.getStartElement();
        const e = element.$;

        let buttonOptions = "btn";

        if (buttonSize) {
          buttonOptions += ` ${buttonSize}`;
        }

        if (buttonColor) {
          buttonOptions += ` ${buttonColor}`;
        }

        if (buttonHtml) {
          buttonText = buttonHtml + buttonText;
        }

        let button = "";
        if (buttonLink) {
          button = `<a class="${buttonOptions}" href="${buttonLink}" target="${buttonLinkTarget}">${buttonText}</a>`;
          e.remove();
        } else {
          button = `<a class="${buttonOptions}" href="" target="">${buttonText}</a>`;
        }

        buttonText = "Button Text";
        buttonSize = "";
        buttonColor = "btn-primary";
        buttonLink = "";
        buttonHtml = "";

        if (this.insertMode) {
          // Insert button
          editor.insertHtml(button, "unfiltered_html");
        }
      }
    };
  });
})(jQuery);
