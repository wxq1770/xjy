// eslint-disable-next-line no-undef
module.exports = {
  name: '<%= name %>',
  subname: '<%= subname %>',
  footer: '<%= footer %>',
  debug: <%= debug %>,
  publicPath: '<%= publicPath %>',
  publicKey: `<%= publicKey %>`,
  api: {
    <% if (api_provider) { %>origin: '<%= api_provider %>',<% } %>
    host: '<%= api.host %>',
  },
};
