
// overall app component
var App = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  componentDidMount: function(){
    // this.handleSearch('Tania Bowra');
    this.handleSearch('');
  },
  componentWillUnmount: function(){
  },
  handleSearch: function(term){
    // check search term exists
    var that = this;
    if (term){
      // TODO escape term
      term = term.toLowerCase();
      term = escape(term);
      console.log('term', term);
      var url = "https://api.spotify.com/v1/search?q="+ term + "&type=artist"; 
        $.get(url, function(data){
          var artists = [];
          if (data.artists){
            data.artists.items.map(function(artist){
              artists.push({name: artist.name, id:artist.id});
            });
          }
          that.setState({artists: artists});
      });
    }
    else {
      // reset query
    }
  
  },
  render: function() {

    // controls set here, using Board component
    return (
      <div>
        <Header handleSearch={this.handleSearch}
        />
        <List artists={this.state.artists} />
      </div>
    );
  }
});

// Header component 
var Header = React.createClass({
  handleSubmit: function(event){
    var val = $(event.currentTarget).find('.search').val();
    console.log('submit', val);
    event.preventDefault();
    this.props.handleSearch(val);
// return false;
  },
  render: function() {
    return (
      <div className="header">
        <h1>Spotify Artists</h1>
        <form onSubmit={this.handleSubmit} >
          <input type='text' className='search' />
          <input type='submit' className='go'></input>
        </form>
      </div>
    );
  }
});

// List of Artists
var List = React.createClass({
  render: function() {
  if (!this.props.artists) return <ul></ul>;
    var items = [];
    this.props.artists.map(function(artist, i){
      items.push(
        <li key={i}>{artist.name}</li>
      );
    });
    return (
      <ul className="list">{items}</ul>
    );
  }
});

React.render(<App />, document.body);
