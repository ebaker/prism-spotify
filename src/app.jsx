
// overall app component
var App = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  componentDidMount: function(){
  },
  componentWillUnmount: function(){
  },
  render: function() {

    // controls set here, using Board component
    return (
      <div>
        <Header
        />
      </div>
    );
  }
});

// Header component 
var Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <h1>Spotify Artists</h1>
        <input type='text' className='search' />
        <button className='go'>Search</button>
      </div>
    );
  }
});

React.render(<App />, document.body);
