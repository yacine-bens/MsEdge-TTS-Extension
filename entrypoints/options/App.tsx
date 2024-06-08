import AlertDialog from "@/assets/components/AlertDialog";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import IosSwitch from "@/assets/components/IosSwitch";
import { storage } from "wxt/storage";
import Mellowtel from "mellowtel";
const CONFIGURATION_KEY = "NTRiOGY0Nzg=";

function App() {
	const mellowtel = new Mellowtel(atob(CONFIGURATION_KEY), {
		MAX_DAILY_RATE: 500,
	});

	const [dialogOpen, setDialogOpen] = useState(false);
	const [switchChecked, setSwitchChecked] = useState(false);

	const disclaimerShown = storage.defineItem<boolean>("local:disclaimerShown", { defaultValue: false });

	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			handleOptIn();
		}
		else {
			handleOptOut();
		}
	};

	const handleOpen = () => {
		setDialogOpen(true);
	};

	const handleClose = () => {
		disclaimerShown.setValue(true);
		setDialogOpen(false);
	};

	const handleOptIn = async () => {
		await mellowtel.optIn();
		const started = await mellowtel.start();
		if (started) {
			setSwitchChecked(true);
			handleClose();
		}
		else {
			await mellowtel.optOut();
			setSwitchChecked(false);
		}
	};

	const handleOptOut = async () => {
		await mellowtel.optOut();

		setSwitchChecked(false);
		handleClose();
	};

	useEffect(() => {
		(async () => {
			const hasOptedIn = await mellowtel.getOptInStatus();
			setSwitchChecked(hasOptedIn);

			const disclaimerShownValue = await disclaimerShown.getValue();
			if (!disclaimerShownValue) {
				handleOpen();
			}
		})();
	}, []);

	return (
		<>
			<Box mx={18} my={2} px={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #ccc', borderRadius: '15px', '& > *': { padding: '10px' } }}>
				<Box sx={{ '& > *': { padding: '10px' } }}>
					<IosSwitch checked={switchChecked} onChange={handleSwitchChange} />
					<Typography variant="body2" textAlign={'justify'} sx={{ fontSize: 'large', lineHeight: '1.75rem' }} >
						By opting in to Mellowtel, you support the extension you are using and ensure that the team behind it can keep maintaining and improving the product.
						<br />
						Mellowtel is an open-source package that helps browser extension creators monetize their work.
						<br />
						The library lets you share your unused internet with trusted AI labs & startups who use it to train their models. The developer of this extension gets a small share of the revenue.
						<br />
						In case you change your mind, you can opt out at any time.
						<br />
						Mellowtel shares your bandwidth only. Security and privacy are 100% guaranteed and the library is open source for everyone to see. It doesn’t collect, share, or sell personal information (not even anonymized data).
						<br />
						It’s also highly regulated: We keep communicating with Chrome Web Store regulators in order to guarantee a safe experience. Mellowtel provides CWS regulators with tools to monitor and enforce compliance.
					</Typography>
				</Box>
			</Box>

			<AlertDialog onClose={handleClose} open={dialogOpen} optIn={handleOptIn} optOut={handleOptOut} />
		</>
	);
}

export default App;