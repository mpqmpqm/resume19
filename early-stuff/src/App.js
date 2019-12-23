import React from 'react';
import './App.css';

//Discogs key: tYumlFYEMwUXeeIURptE
//Discogs secret: wDhnGZAYPXjdhQDHWdduAXHQAbAjnCAE

const discogsKey = 'tYumlFYEMwUXeeIURptE'
const discogsSecret = 'wDhnGZAYPXjdhQDHWdduAXHQAbAjnCAE'

class App extends React.Component {

	constructor () {
		super ();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			loading: true,
			data: {},
			value: '',
			foundData: false,
			artist: [],
			titles: [],
			years: [],
			header: 'Enter a musical act'
		}
	}

	handleChange (event) {
		this.setState ({
			value: event.target.value
		})
	}

	handleSubmit (event) {
		event.preventDefault();

		this.setState ({header: 'Loading...'})

		fetch (`https://api.discogs.com/database/search?type=artist&q=${this.state.value}&key=${discogsKey}&secret=${discogsSecret}`)
			.then (response => response.json())
				.then (data => {
					this.setState ({data: data})})
						.then (() => 
							{
								if (this.state.data.results.length > 0) {

								// console.log(this.state.data.results[0].id);
								this.setState({header: 'Loading...'})

									fetch (`https://api.discogs.com/artists/${this.state.data.results[0].id}/releases?year,asc`)
										.then (response => response.json())
											.then (data => {

												let i = 0;
												let titles = []
												let years = []

												for (i; i < data.releases.length; i++) {
													if (i > 2) {
														break
													} else {
														titles.push (data.releases[i].title)
														years.push (data.releases[i].year)
													}
													}
												
												// console.log(years);

												this.setState ({
													artist: data.releases[0].artist,
													titles: titles,
													years: years,
													foundData: true,
													header: data.releases[0].artist
												})

												console.log(this.state.years[0]);

											})

									}
											// console.log(data.releases[i].artist, data.releases[i].title, data.releases[i].format);})
					
				
								else {
									this.setState ({foundData: false, header: 'Not found, please try again.'});
								}})

		
		event.target.reset();
  }


	render () {

		return (
			<div className = 'app'>

				<h1>I liked their early stuff better...</h1>

				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleChange}/>
					<input type="submit" value='Submit'/>
				</form>
				<div className = 'info'>
					{/* <img 
						src = {this.state.foundData ? this.state.data.results[0].thumb : null} 
						alt = 'img' 
						style = {{display: this.state.foundData ? 'block' : 'none'}}
					/> */}

					<h2>{this.state.header}</h2>
					
					
					<h3>{this.state.foundData ? this.state.titles[0] : null}{this.state.foundData ? ` (${this.state.years[0]})` : null}</h3>
					<h3>{this.state.foundData ? this.state.titles[1] : null}{this.state.foundData ? ` (${this.state.years[1]})` : null}</h3>
					<h3>{this.state.foundData ? this.state.titles[2] : null}{this.state.foundData ? ` (${this.state.years[2]})` : null}</h3>
					{/* <h3>{this.state.foundData ? this.state.titles[3] : null}{this.state.foundData ? `, (${this.state.years[3]})` : null}</h3> */}

				</div>
			</div>
		)
		}

	}
export default App;
