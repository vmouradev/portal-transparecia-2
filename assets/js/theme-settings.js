/*==============================================================
  Theme Configurator JS
================================================================*/
(function ($) {
  "use strict";

  $(document).ready(function () {
    // 1. Create UI HTML
    const configUI = `
    <div class="cs_theme_config">
      <div class="cs_theme_config_btn">
        <i class="fa-solid fa-gear"></i>
      </div>
      <h2 class="cs_config_title">Configurações</h2>
      
      <!-- Dark Mode -->
      <div class="cs_config_group">
        <label class="cs_config_label">Modo de Visualização</label>
        <div class="cs_mode_switch" id="cs_dark_mode_toggle">
           <span><i class="fa-solid fa-moon"></i> Modo Escuro</span>
           <i class="fa-solid fa-toggle-off" id="cs_toggle_icon"></i>
        </div>
      </div>

      <!-- Colors -->
      <div class="cs_config_group">
        <label class="cs_config_label">Cor Principal</label>
        <div class="cs_color_swatch_group">
          <div class="cs_color_swatch active" data-color="#0c4a6e" style="background: #0c4a6e;"></div>
          <div class="cs_color_swatch" data-color="#1F77D6" style="background: #1F77D6;"></div>
          <div class="cs_color_swatch" data-color="#10b981" style="background: #10b981;"></div>
          <div class="cs_color_swatch" data-color="#f59e0b" style="background: #f59e0b;"></div>
          <div class="cs_color_swatch" data-color="#ef4444" style="background: #ef4444;"></div>
          <div class="cs_color_swatch" data-color="#8b5cf6" style="background: #8b5cf6;"></div>
        </div>
      </div>

      <!-- Fonts -->
      <div class="cs_config_group">
        <label class="cs_config_label">Fonte Principal</label>
        <select class="cs_config_select" id="cs_font_select">
          <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans</option>
          <option value="'Inter', sans-serif">Inter</option>
          <option value="'Roboto', sans-serif">Roboto</option>
          <option value="'Open Sans', sans-serif">Open Sans</option>
        </select>
      </div>

      <!-- Layout -->
      <div class="cs_config_group">
        <label class="cs_config_label">Layout do Site</label>
        <div class="cs_layout_btns">
          <div class="cs_layout_btn active" data-layout="wide">Amplo</div>
          <div class="cs_layout_btn" data-layout="boxed">Boxed</div>
        </div>
      </div>

      <div class="cs_height_20"></div>
      <button id="cs_reset_config" class="cs_btn_style_1 cs_accent_bg cs_primary_color cs_radius_32 w-100" style="padding: 10px;">
        <span>Resetar Originais</span>
      </button>
    </div>
    `;

    $('body').append(configUI);

    // 2. State Management
    const config = {
      color: localStorage.getItem('cs_primary_color') || '#0c4a6e',
      font: localStorage.getItem('cs_primary_font') || "'Plus Jakarta Sans', sans-serif",
      layout: localStorage.getItem('cs_site_layout') || 'wide',
      darkMode: localStorage.getItem('cs_dark_mode') === 'enabled'
    };

    // 3. Apply Saved Settings
    function applySettings() {
      // Color
      document.documentElement.style.setProperty('--primary-color', config.color);
      document.documentElement.style.setProperty('--dark-blue', config.color);

      // Font
      document.documentElement.style.setProperty('--primary-font', config.font);

      // Layout
      if (config.layout === 'boxed') {
        $('body').addClass('cs_boxed_layout');
        $('.cs_layout_btn[data-layout="boxed"]').addClass('active').siblings().removeClass('active');
      }

      // Dark Mode
      if (config.darkMode) {
        $('body').addClass('cs_dark_mode');
        $('#cs_dark_mode_toggle').addClass('active');
        $('#cs_toggle_icon').removeClass('fa-toggle-off').addClass('fa-toggle-on');
      }

      // Update UI state
      $(`.cs_color_swatch[data-color="${config.color}"]`).addClass('active').siblings().removeClass('active');
      $('#cs_font_select').val(config.font);
    }

    applySettings();

    // 4. Events
    $('.cs_theme_config_btn').on('click', function () {
      $('.cs_theme_config').toggleClass('active');
    });

    $('#cs_dark_mode_toggle').on('click', function () {
      $(this).toggleClass('active');
      const isDark = $(this).hasClass('active');
      if (isDark) {
        $('body').addClass('cs_dark_mode');
        localStorage.setItem('cs_dark_mode', 'enabled');
        $('#cs_toggle_icon').removeClass('fa-toggle-off').addClass('fa-toggle-on');
      } else {
        $('body').removeClass('cs_dark_mode');
        localStorage.setItem('cs_dark_mode', 'disabled');
        $('#cs_toggle_icon').removeClass('fa-toggle-on').addClass('fa-toggle-off');
      }
    });

    $('.cs_color_swatch').on('click', function () {
      const color = $(this).data('color');
      $(this).addClass('active').siblings().removeClass('active');
      config.color = color;
      localStorage.setItem('cs_primary_color', color);
      document.documentElement.style.setProperty('--primary-color', color);
      document.documentElement.style.setProperty('--dark-blue', color);
    });

    $('#cs_font_select').on('change', function () {
      const font = $(this).val();
      config.font = font;
      localStorage.setItem('cs_primary_font', font);
      document.documentElement.style.setProperty('--primary-font', font);
    });

    $('.cs_layout_btn').on('click', function () {
      const layout = $(this).data('layout');
      $(this).addClass('active').siblings().removeClass('active');
      config.layout = layout;
      localStorage.setItem('cs_site_layout', layout);
      if (layout === 'boxed') {
        $('body').addClass('cs_boxed_layout');
      } else {
        $('body').removeClass('cs_boxed_layout');
      }
    });

    $('#cs_reset_config').on('click', function () {
      localStorage.clear();
      window.location.reload();
    });
  });

})(jQuery);
