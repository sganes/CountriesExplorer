import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 1500,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

function AlignItemsList(props) {
    const { classes } = props;
    return (
        <List className={classes.root}>
            <ListItem alignItems="flex-start" >
                <ListItemAvatar>
                    <Avatar alt="flag" src={props.flag} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.children}
                    secondary={
                        <React.Fragment>
                            <Typography component="span" className={classes.inline} color="textPrimary">
                                Capital: {props.capital}
                                <br /><br />
                            </Typography>
                            {props.children} has total population of {props.population}.<br />
                            Curreny used is {props.currency}. <br /><br />
                            SEK <input type="text" value={props.currencyToCovert} onChange={props.updateCurrency }/> 
                            <Button variant="outlined" size="small" color="primary" className={classes.margin} style={{margin : 20}} onClick={props.convertCurrency}>exchange to {props.currencyCode}</Button>{props.convertedCurrency}
                         </React.Fragment>
                    }
                />
            </ListItem>
        </List>
    );
}

AlignItemsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);