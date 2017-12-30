require 'rails_helper'
require 'spec_helper'

RSpec.feature 'user logs in' do
  scenario 'using google oauth2' do
    stub_omniauth
    visit root_path
    expect(page).to have_content('Welcome to')
    click_link 'google-sign-in'
    expect(page).to_not have_link('Welcome to')
  end
end
