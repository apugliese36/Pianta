OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2,
   '733657834480-cjip2hn3qpjgdg49fkp9dhvj95h8phiq.apps.googleusercontent.com',
    'ZLfofjA6RHRhL8cgmecRhayv',
    {client_options:
      {ssl:
        {ca_file: Rails.root.join("cacert.pem").to_s}
      }
    }
end
