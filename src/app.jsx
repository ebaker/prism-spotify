
// overall app component
var App = React.createClass({
  getInitialState: function() {
    return {
      artists: [],
      artist: {}
    };
  },

  // searches spotify API for artist
  handleSearch: function(term){

    // reset track list
    this.setState({artist: {}});

    // check search term exists
    var that = this;
    if (term){

      // TODO escape term
      term = term.toLowerCase();
      term = escape(term);
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
      this.setState({artists: []});
    }
  
  },
  handleBack: function(){
   this.handleSearch('');
  },

  // gets top track for artist
  handleArtist: function(artist){
    if (!artist.name) return;
    if (artist.id){
      var that = this;
      var country = "US";
      var url = "https://api.spotify.com/v1/artists/"+ artist.id + "/top-tracks?country=" + country;
      $.get(url, function(data){
        if (data.tracks){
          artist.tracks = data.tracks;
          that.setState({artist: artist});
        }
      });
    }
  },
  render: function() {

    if (this.state.artist.name){
      return (
        <Artist 
          artistId={this.state.artistId}
          artist={this.state.artist}
          handleBack={this.handleBack}
        />
      );
    }

    // controls set here, using Board component
    return (
      <div>
        <Header handleSearch={this.handleSearch}
        />
        <List artists={this.state.artists} handleArtist={this.handleArtist}/>
      </div>
    );
  }
});

// Header component 
// - search bar
var Header = React.createClass({
  handleSubmit: function(event){
    var val = $(event.currentTarget).find('.search').val();
    event.preventDefault();
    this.props.handleSearch(val);
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
  handleClick: function(artist){
    this.props.handleArtist(artist);
  },
  render: function() {
  if (!this.props.artists) return <ul></ul>;
    var items = [];
    var that = this;
    this.props.artists.map(function(artist, i){
      items.push(
        <li key={i} onClick={that.handleClick.bind(null, artist)}>{artist.name}</li>
      );
    });
    return (
      <ul className="list">{items}</ul>
    );
  }
});

// Artist details component
// - display artist name and top tracks
var Artist = React.createClass({
  render: function(){
    // if (!this.props.artistId) return <div />;
    var tracks = [];
    if (this.props.artist){
      if (this.props.artist.tracks)
      this.props.artist.tracks.map(function(track, i){
        tracks.push(
          <li key={i}>{track.name}</li>
        );
      });
    }
      return (
      <div>
        <h1>Spotify Artists</h1>
        <button onClick={this.props.handleBack}>Back</button>
        <h3>{this.props.artist.name}</h3>
        <ol>{tracks}</ol>
      </div>
    );
  }
});

React.render(<App />, document.body);
