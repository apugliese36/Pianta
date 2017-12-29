require 'rails_helper'
require 'spec_helper'

RSpec.feature 'user logs in' do
  scenario 'using google oauth2' do
    stub_omniauth
    visit root_path
    expect(page).to have_link('Sign in with Google')
    click_link 'Sign in with Google'
    expect(page).to_not have_link('Sign in with Google')
  end
end
