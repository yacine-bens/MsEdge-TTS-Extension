import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from '@mui/material';

export default function AlertDialog(props: any) {
	const { open, optIn, optOut } = props;

	return (
		<React.Fragment>
			<Dialog
				open={open}
			>
				<DialogTitle>NEW UPDATE !</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ textAlign: 'justify'}}>
						✨ We are excited to announce the dark mode feature, as well as a new feature that will help us keep the service free and available. ✨
						<br />
						<br />
						If you choose to continue and click "Support Developer", we will also use the <Link href='https://docs.mellowtel.it/concepts/user-experience' target='_blank'>Mellowtel API</Link> to enable trusted partners to access internet resources by also routing part of their traffic through your node in the network.
						<br />
						If you choose "No, thanks", we will not use the additional purposes indicated.
						The service is used by trusted partners without affecting the speed or quality of your browsing. You can choose not participate at any time from the extension settings. By accepting, you help us keep the service free and available.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={optOut} variant='outlined' color='error' >No, thanks</Button>
					<Button onClick={optIn} variant='contained' color='success' >Support Developer</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}