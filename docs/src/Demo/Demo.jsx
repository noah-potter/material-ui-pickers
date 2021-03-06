import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { 
  AppBar, Toolbar, IconButton, Typography, withStyles, Button, Tooltip, Icon, InputAdornment
} from 'material-ui'
import { TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers'
import Github from './GithubIcon'
import './Demo.css';
import moment from 'moment';

class Demo extends Component {
  static propTypes = {
    toggleThemeType: PropTypes.func.isRequired,
  }

  state = {
    selectedDate: moment(),
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date })
  }

  handleWeekChange = date => {
    this.setState({ selectedDate: date.clone().startOf('week') })
  }

  scrollToContent = () => {
    const contentEl = document.getElementById('content');
    contentEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  changeOutside = () => {
    this.setState({ selectedDate: moment('2015-02-02 12:44') })
  }

  renderWrappedDefaultDay = (date, selectedDate, dayInCurrentMonth) => {
    const { classes } = this.props

    const startDate = selectedDate.clone().day(0).startOf('day')
    const endDate = selectedDate.clone().day(6).endOf('day')

    const dayIsBetween = (
      date.isSame(startDate) ||
      date.isSame(endDate) ||
      (date.isAfter(startDate) && date.isBefore(endDate))
    )

    const firstDay = date.isSame(startDate, 'day')
    const lastDay = date.isSame(endDate, 'day')

    const wrapperClassName = [
      dayIsBetween ? classes.highlight : null,
      firstDay ? classes.firstHighlight : null,
      lastDay ? classes.endHighlight : null,
    ].join(' ')

    const dayClassName = [
      classes.day,
      (!dayInCurrentMonth) && classes.nonCurrentMonthDay,
      (!dayInCurrentMonth && dayIsBetween) && classes.highlightNonCurrentMonthDay,
    ].join(' ')

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> { date.format('DD')} </span>
        </IconButton>
      </div>
    )
  }

  formatWeekSelectLabel = (date, invalidLabel) => {
    return date && date.isValid()
      ? `Week of ${date.clone().startOf('week').format('MMM Do')}`
      : invalidLabel
  }

  renderCustomDayForDateTime = (date, selectedDate, dayInCurrentMonth, dayComponent) => {
    const { classes } = this.props

    const dayClassName = [
      (date.isSame(selectedDate, 'day')) && classes.customDayHighlight,
    ].join(' ')

    return (
      <div className={classes.dayWrapper}>
        {dayComponent}
        <div className={dayClassName} />
      </div>
    )
  }

  render() {
    const { classes } = this.props
    const { selectedDate } = this.state

    return (
      <main className={classes.main}>
        <AppBar position="fixed" className={classes.noShadow}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
              menu
            </IconButton>

           <div className={classes.flex} />

           <Tooltip title="Toggle light/dark theme" enterDelay={300}>
            <IconButton color="contrast" onClick={this.props.toggleThemeType}>
              lightbulb_outline
            </IconButton>
           </Tooltip>

          <a href="https://github.com/dmtrKovalenko/material-ui-pickers">
            <IconButton>
              <Github color="white"/>
            </IconButton>
          </a>
          </Toolbar>
        </AppBar>

        <Toolbar color="primary" className={classes.appToolbar}>
          <img className="material-ui-logo" src="https://material-ui-1dab0.firebaseapp.com/static/images/material-ui-logo.svg" />

          <Typography type="display1" color="inherit" className='title text-light' gutterBottom>
            Material-UI Pickers
          </Typography>
          <Typography type="headline" align="center" color="inherit" gutterBottom className='text-light'>
            Date and Time pickers for material-ui v1
          </Typography>

          <Button raised className={classes.getStarted} onClick={this.scrollToContent}>
            Get Started
          </Button>
        </Toolbar>


        <div id="content" className={classes.content}>
          <Typography type="display2" align="center" gutterBottom>
            Here you are!
          </Typography>

          <Button className={classes.changeOutside} onClick={this.changeOutside}>
            Change all values
          </Button>

          <Typography type="display1" className={classes.example}>
            Basic usage
          </Typography>

          <div className={classes.pickers}>
            <div className="picker">
              <Typography type="headline" align="center" gutterBottom>
                Date picker
              </Typography>

              <DatePicker
                value={selectedDate}
                onChange={this.handleDateChange}
                animateYearScrolling={false}
              />
            </div>

            <div className="picker">
              <Typography type="headline" align="center" gutterBottom>
                Time picker
              </Typography>

              <TimePicker
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
              />
            </div>
          </div>

          <Typography type="display1" gutterBottom>
            Date & Time pickers
          </Typography>

          <div className={classes.pickers}>
            <div className="picker">
              <Typography type="headline" align="center" gutterBottom>
                Default
              </Typography>

              <DateTimePicker
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
              />
            </div>

            <div className="picker">
              <Typography type="headline" align="center" gutterBottom>
                Custom
              </Typography>

              <DateTimePicker
                error
                helperText="Required"
                showTabs={false}
                autoOk
                disableFuture
                autoSubmit={false}
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                leftArrowIcon="add_alarm"
                rightArrowIcon="snooze"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>  add_alarm  </IconButton>
                    </InputAdornment>
                  )
                }} 
              />
            </div>
          </div>

          <Typography type="display1" gutterBottom>
            Custom Day Element
          </Typography>

          <div className={classes.pickers}>
            <div className="picker">
              <Typography type="headline" align="center" gutterBottom>
                Week picker
              </Typography>

              <DatePicker
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                renderDay={this.renderWrappedDefaultDay}
                labelFunc={this.formatWeekSelectLabel}
              />
            </div>

            <div className="picker">
              <Typography type="headline" align="center" gutterBottom>
                DateTime picker
              </Typography>

              <DateTimePicker
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                renderDay={this.renderCustomDayForDateTime}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const styles = theme => ({
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  noShadow: {
    boxShadow: 'unset'
  },
  appToolbar: {
    backgroundColor: theme.palette.primary[500],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    padding: '40px 20px',
    '@media (max-width: 600px)': {
      paddingTop: '100px',
      minHeight: 'calc(100vh - 55px)',
    },
  },
  getStarted: {
    marginTop: '10px',
  },
  example: {
    marginTop: '40px'
  },
  main: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: -50
  },
  pickers: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    minHeight: 160,
    paddingTop: 40,
    margin: '30px auto 50px',
    backgroundColor: theme.palette.background.default,
  },
  dayWrapper: {
    position: 'relative',
  },
  day: {
    width: 36,
    height: 36,
    fontSize: 14,
    margin: '0 2px',
    color: theme.palette.text.primary,
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: '2px solid #6270bf',
    borderRadius: '50%',
  },
  nonCurrentMonthDay: {
    color: '#BCBCBC',
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: '#9fa8da',
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },
  content: {
    paddingTop: '60px',
    backgroundColor: theme.palette.background.paper,
    minHeight: 'calc(100vh - 63px)',
    maxWidth: 900,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    '@media(max-width: 600px)': {
      minHeight: 'calc(100vh - 55px)'
    }
  },
  changeOutside: {
    maxWidth: 200,
    margin: '0 auto'
  }
})

export default withStyles(styles)(Demo);
