import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox() {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Object.keys(languages)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Language" />}
        />
    );
}

const languages = {
    "Afrikaans": {
        "South Africa": {
            "Female": [
                {
                    "name": "Adri",
                    "shortName": "af-ZA-AdriNeural"
                }
            ],
            "Male": [
                {
                    "name": "Willem",
                    "shortName": "af-ZA-WillemNeural"
                }
            ]
        }
    },
    "Albanian": {
        "Albania": {
            "Female": [
                {
                    "name": "Anila",
                    "shortName": "sq-AL-AnilaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Ilir",
                    "shortName": "sq-AL-IlirNeural"
                }
            ]
        }
    },
    "Amharic": {
        "Ethiopia": {
            "Male": [
                {
                    "name": "Ameha",
                    "shortName": "am-ET-AmehaNeural"
                }
            ],
            "Female": [
                {
                    "name": "Mekdes",
                    "shortName": "am-ET-MekdesNeural"
                }
            ]
        }
    },
    "Arabic": {
        "Algeria": {
            "Female": [
                {
                    "name": "Amina",
                    "shortName": "ar-DZ-AminaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Ismael",
                    "shortName": "ar-DZ-IsmaelNeural"
                }
            ]
        },
        "Bahrain": {
            "Male": [
                {
                    "name": "Ali",
                    "shortName": "ar-BH-AliNeural"
                }
            ],
            "Female": [
                {
                    "name": "Laila",
                    "shortName": "ar-BH-LailaNeural"
                }
            ]
        },
        "Egypt": {
            "Female": [
                {
                    "name": "Salma",
                    "shortName": "ar-EG-SalmaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Shakir",
                    "shortName": "ar-EG-ShakirNeural"
                }
            ]
        },
        "Iraq": {
            "Male": [
                {
                    "name": "Bassel",
                    "shortName": "ar-IQ-BasselNeural"
                }
            ],
            "Female": [
                {
                    "name": "Rana",
                    "shortName": "ar-IQ-RanaNeural"
                }
            ]
        },
        "Jordan": {
            "Female": [
                {
                    "name": "Sana",
                    "shortName": "ar-JO-SanaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Taim",
                    "shortName": "ar-JO-TaimNeural"
                }
            ]
        },
        "Kuwait": {
            "Male": [
                {
                    "name": "Fahed",
                    "shortName": "ar-KW-FahedNeural"
                }
            ],
            "Female": [
                {
                    "name": "Noura",
                    "shortName": "ar-KW-NouraNeural"
                }
            ]
        },
        "Lebanon": {
            "Female": [
                {
                    "name": "Layla",
                    "shortName": "ar-LB-LaylaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Rami",
                    "shortName": "ar-LB-RamiNeural"
                }
            ]
        },
        "Libya": {
            "Female": [
                {
                    "name": "Iman",
                    "shortName": "ar-LY-ImanNeural"
                }
            ],
            "Male": [
                {
                    "name": "Omar",
                    "shortName": "ar-LY-OmarNeural"
                }
            ]
        },
        "Morocco": {
            "Male": [
                {
                    "name": "Jamal",
                    "shortName": "ar-MA-JamalNeural"
                }
            ],
            "Female": [
                {
                    "name": "Mouna",
                    "shortName": "ar-MA-MounaNeural"
                }
            ]
        },
        "Oman": {
            "Male": [
                {
                    "name": "Abdullah",
                    "shortName": "ar-OM-AbdullahNeural"
                }
            ],
            "Female": [
                {
                    "name": "Aysha",
                    "shortName": "ar-OM-AyshaNeural"
                }
            ]
        },
        "Qatar": {
            "Female": [
                {
                    "name": "Amal",
                    "shortName": "ar-QA-AmalNeural"
                }
            ],
            "Male": [
                {
                    "name": "Moaz",
                    "shortName": "ar-QA-MoazNeural"
                }
            ]
        },
        "Saudi Arabia": {
            "Male": [
                {
                    "name": "Hamed",
                    "shortName": "ar-SA-HamedNeural"
                }
            ],
            "Female": [
                {
                    "name": "Zariyah",
                    "shortName": "ar-SA-ZariyahNeural"
                }
            ]
        },
        "Syria": {
            "Female": [
                {
                    "name": "Amany",
                    "shortName": "ar-SY-AmanyNeural"
                }
            ],
            "Male": [
                {
                    "name": "Laith",
                    "shortName": "ar-SY-LaithNeural"
                }
            ]
        },
        "Tunisia": {
            "Male": [
                {
                    "name": "Hedi",
                    "shortName": "ar-TN-HediNeural"
                }
            ],
            "Female": [
                {
                    "name": "Reem",
                    "shortName": "ar-TN-ReemNeural"
                }
            ]
        },
        "United Arab Emirates": {
            "Female": [
                {
                    "name": "Fatima",
                    "shortName": "ar-AE-FatimaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Hamdan",
                    "shortName": "ar-AE-HamdanNeural"
                }
            ]
        },
        "Yemen": {
            "Female": [
                {
                    "name": "Maryam",
                    "shortName": "ar-YE-MaryamNeural"
                }
            ],
            "Male": [
                {
                    "name": "Saleh",
                    "shortName": "ar-YE-SalehNeural"
                }
            ]
        }
    },
    "Azerbaijani": {
        "Azerbaijan": {
            "Male": [
                {
                    "name": "Babek",
                    "shortName": "az-AZ-BabekNeural"
                }
            ],
            "Female": [
                {
                    "name": "Banu",
                    "shortName": "az-AZ-BanuNeural"
                }
            ]
        }
    },
    "Bangla": {
        "Bangladesh": {
            "Female": [
                {
                    "name": "Nabanita",
                    "shortName": "bn-BD-NabanitaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Pradeep",
                    "shortName": "bn-BD-PradeepNeural"
                }
            ]
        },
        "India": {
            "Male": [
                {
                    "name": "Bashkar",
                    "shortName": "bn-IN-BashkarNeural"
                }
            ]
        }
    },
    "Bengali": {
        "India": {
            "Female": [
                {
                    "name": "Tanishaa",
                    "shortName": "bn-IN-TanishaaNeural"
                }
            ]
        }
    },
    "Bosnian": {
        "Bosnia": {
            "Male": [
                {
                    "name": "Goran",
                    "shortName": "bs-BA-GoranNeural"
                }
            ],
            "Female": [
                {
                    "name": "Vesna",
                    "shortName": "bs-BA-VesnaNeural"
                }
            ]
        }
    },
    "Bulgarian": {
        "Bulgaria": {
            "Male": [
                {
                    "name": "Borislav",
                    "shortName": "bg-BG-BorislavNeural"
                }
            ],
            "Female": [
                {
                    "name": "Kalina",
                    "shortName": "bg-BG-KalinaNeural"
                }
            ]
        }
    },
    "Burmese": {
        "Myanmar": {
            "Female": [
                {
                    "name": "Nilar",
                    "shortName": "my-MM-NilarNeural"
                }
            ],
            "Male": [
                {
                    "name": "Thiha",
                    "shortName": "my-MM-ThihaNeural"
                }
            ]
        }
    },
    "Catalan": {
        "Spain": {
            "Male": [
                {
                    "name": "Enric",
                    "shortName": "ca-ES-EnricNeural"
                }
            ],
            "Female": [
                {
                    "name": "Joana",
                    "shortName": "ca-ES-JoanaNeural"
                }
            ]
        }
    },
    "Chinese": {
        "Cantonese Traditional": {
            "Female": [
                {
                    "name": "HiuGaai",
                    "shortName": "zh-HK-HiuGaaiNeural"
                }
            ]
        },
        "Hong Kong": {
            "Female": [
                {
                    "name": "HiuMaan",
                    "shortName": "zh-HK-HiuMaanNeural"
                }
            ],
            "Male": [
                {
                    "name": "WanLung",
                    "shortName": "zh-HK-WanLungNeural"
                }
            ]
        },
        "Mainland": {
            "Female": [
                {
                    "name": "Xiaoxiao",
                    "shortName": "zh-CN-XiaoxiaoNeural"
                },
                {
                    "name": "Xiaoyi",
                    "shortName": "zh-CN-XiaoyiNeural"
                }
            ],
            "Male": [
                {
                    "name": "Yunjian",
                    "shortName": "zh-CN-YunjianNeural"
                },
                {
                    "name": "Yunxi",
                    "shortName": "zh-CN-YunxiNeural"
                },
                {
                    "name": "Yunxia",
                    "shortName": "zh-CN-YunxiaNeural"
                },
                {
                    "name": "Yunyang",
                    "shortName": "zh-CN-YunyangNeural"
                }
            ]
        },
        "Northeastern Mandarin": {
            "Female": [
                {
                    "name": "Xiaobei",
                    "shortName": "zh-CN-liaoning-XiaobeiNeural"
                }
            ]
        },
        "Taiwan": {
            "Female": [
                {
                    "name": "HsiaoChen",
                    "shortName": "zh-TW-HsiaoChenNeural"
                }
            ],
            "Male": [
                {
                    "name": "YunJhe",
                    "shortName": "zh-TW-YunJheNeural"
                }
            ]
        },
        "Taiwanese Mandarin": {
            "Female": [
                {
                    "name": "HsiaoYu",
                    "shortName": "zh-TW-HsiaoYuNeural"
                }
            ]
        },
        "Zhongyuan Mandarin Shaanxi": {
            "Female": [
                {
                    "name": "Xiaoni",
                    "shortName": "zh-CN-shaanxi-XiaoniNeural"
                }
            ]
        }
    },
    "Croatian": {
        "Croatia": {
            "Female": [
                {
                    "name": "Gabrijela",
                    "shortName": "hr-HR-GabrijelaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Srecko",
                    "shortName": "hr-HR-SreckoNeural"
                }
            ]
        }
    },
    "Czech": {
        "Czech": {
            "Male": [
                {
                    "name": "Antonin",
                    "shortName": "cs-CZ-AntoninNeural"
                }
            ],
            "Female": [
                {
                    "name": "Vlasta",
                    "shortName": "cs-CZ-VlastaNeural"
                }
            ]
        }
    },
    "Danish": {
        "Denmark": {
            "Female": [
                {
                    "name": "Christel",
                    "shortName": "da-DK-ChristelNeural"
                }
            ],
            "Male": [
                {
                    "name": "Jeppe",
                    "shortName": "da-DK-JeppeNeural"
                }
            ]
        }
    },
    "Dutch": {
        "Belgium": {
            "Male": [
                {
                    "name": "Arnaud",
                    "shortName": "nl-BE-ArnaudNeural"
                }
            ],
            "Female": [
                {
                    "name": "Dena",
                    "shortName": "nl-BE-DenaNeural"
                }
            ]
        },
        "Netherlands": {
            "Female": [
                {
                    "name": "Colette",
                    "shortName": "nl-NL-ColetteNeural"
                },
                {
                    "name": "Fenna",
                    "shortName": "nl-NL-FennaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Maarten",
                    "shortName": "nl-NL-MaartenNeural"
                }
            ]
        }
    },
    "English": {
        "Australia": {
            "Female": [
                {
                    "name": "Natasha",
                    "shortName": "en-AU-NatashaNeural"
                }
            ],
            "Male": [
                {
                    "name": "William",
                    "shortName": "en-AU-WilliamNeural"
                }
            ]
        },
        "Canada": {
            "Female": [
                {
                    "name": "Clara",
                    "shortName": "en-CA-ClaraNeural"
                }
            ],
            "Male": [
                {
                    "name": "Liam",
                    "shortName": "en-CA-LiamNeural"
                }
            ]
        },
        "Hongkong": {
            "Male": [
                {
                    "name": "Sam",
                    "shortName": "en-HK-SamNeural"
                }
            ],
            "Female": [
                {
                    "name": "Yan",
                    "shortName": "en-HK-YanNeural"
                }
            ]
        },
        "Preview": {
            "Female": [
                {
                    "name": "Neerja",
                    "shortName": "en-IN-NeerjaExpressiveNeural"
                }
            ]
        },
        "India": {
            "Female": [
                {
                    "name": "Neerja",
                    "shortName": "en-IN-NeerjaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Prabhat",
                    "shortName": "en-IN-PrabhatNeural"
                }
            ]
        },
        "Ireland": {
            "Male": [
                {
                    "name": "Connor",
                    "shortName": "en-IE-ConnorNeural"
                }
            ],
            "Female": [
                {
                    "name": "Emily",
                    "shortName": "en-IE-EmilyNeural"
                }
            ]
        },
        "Kenya": {
            "Female": [
                {
                    "name": "Asilia",
                    "shortName": "en-KE-AsiliaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Chilemba",
                    "shortName": "en-KE-ChilembaNeural"
                }
            ]
        },
        "New Zealand": {
            "Male": [
                {
                    "name": "Mitchell",
                    "shortName": "en-NZ-MitchellNeural"
                }
            ],
            "Female": [
                {
                    "name": "Molly",
                    "shortName": "en-NZ-MollyNeural"
                }
            ]
        },
        "Nigeria": {
            "Male": [
                {
                    "name": "Abeo",
                    "shortName": "en-NG-AbeoNeural"
                }
            ],
            "Female": [
                {
                    "name": "Ezinne",
                    "shortName": "en-NG-EzinneNeural"
                }
            ]
        },
        "Philippines": {
            "Male": [
                {
                    "name": "James",
                    "shortName": "en-PH-JamesNeural"
                }
            ],
            "Female": [
                {
                    "name": "Rosa",
                    "shortName": "en-PH-RosaNeural"
                }
            ]
        },
        "United States": {
            "Female": [
                {
                    "name": "Ava",
                    "shortName": "en-US-AvaNeural"
                },
                {
                    "name": "Emma",
                    "shortName": "en-US-EmmaNeural"
                },
                {
                    "name": "Ana",
                    "shortName": "en-US-AnaNeural"
                },
                {
                    "name": "Aria",
                    "shortName": "en-US-AriaNeural"
                },
                {
                    "name": "Jenny",
                    "shortName": "en-US-JennyNeural"
                },
                {
                    "name": "Michelle",
                    "shortName": "en-US-MichelleNeural"
                }
            ],
            "Male": [
                {
                    "name": "Andrew",
                    "shortName": "en-US-AndrewNeural"
                },
                {
                    "name": "Brian",
                    "shortName": "en-US-BrianNeural"
                },
                {
                    "name": "Christopher",
                    "shortName": "en-US-ChristopherNeural"
                },
                {
                    "name": "Eric",
                    "shortName": "en-US-EricNeural"
                },
                {
                    "name": "Guy",
                    "shortName": "en-US-GuyNeural"
                },
                {
                    "name": "Roger",
                    "shortName": "en-US-RogerNeural"
                },
                {
                    "name": "Steffan",
                    "shortName": "en-US-SteffanNeural"
                }
            ]
        },
        "Singapore": {
            "Female": [
                {
                    "name": "Luna",
                    "shortName": "en-SG-LunaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Wayne",
                    "shortName": "en-SG-WayneNeural"
                }
            ]
        },
        "South Africa": {
            "Female": [
                {
                    "name": "Leah",
                    "shortName": "en-ZA-LeahNeural"
                }
            ],
            "Male": [
                {
                    "name": "Luke",
                    "shortName": "en-ZA-LukeNeural"
                }
            ]
        },
        "Tanzania": {
            "Male": [
                {
                    "name": "Elimu",
                    "shortName": "en-TZ-ElimuNeural"
                }
            ],
            "Female": [
                {
                    "name": "Imani",
                    "shortName": "en-TZ-ImaniNeural"
                }
            ]
        },
        "United Kingdom": {
            "Female": [
                {
                    "name": "Libby",
                    "shortName": "en-GB-LibbyNeural"
                },
                {
                    "name": "Maisie",
                    "shortName": "en-GB-MaisieNeural"
                },
                {
                    "name": "Sonia",
                    "shortName": "en-GB-SoniaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Ryan",
                    "shortName": "en-GB-RyanNeural"
                },
                {
                    "name": "Thomas",
                    "shortName": "en-GB-ThomasNeural"
                }
            ]
        }
    },
    "Estonian": {
        "Estonia": {
            "Female": [
                {
                    "name": "Anu",
                    "shortName": "et-EE-AnuNeural"
                }
            ],
            "Male": [
                {
                    "name": "Kert",
                    "shortName": "et-EE-KertNeural"
                }
            ]
        }
    },
    "Filipino": {
        "Philippines": {
            "Male": [
                {
                    "name": "Angelo",
                    "shortName": "fil-PH-AngeloNeural"
                }
            ],
            "Female": [
                {
                    "name": "Blessica",
                    "shortName": "fil-PH-BlessicaNeural"
                }
            ]
        }
    },
    "Finnish": {
        "Finland": {
            "Male": [
                {
                    "name": "Harri",
                    "shortName": "fi-FI-HarriNeural"
                }
            ],
            "Female": [
                {
                    "name": "Noora",
                    "shortName": "fi-FI-NooraNeural"
                }
            ]
        }
    },
    "French": {
        "Belgium": {
            "Female": [
                {
                    "name": "Charline",
                    "shortName": "fr-BE-CharlineNeural"
                }
            ],
            "Male": [
                {
                    "name": "Gerard",
                    "shortName": "fr-BE-GerardNeural"
                }
            ]
        },
        "Canada": {
            "Male": [
                {
                    "name": "Thierry",
                    "shortName": "fr-CA-ThierryNeural"
                },
                {
                    "name": "Antoine",
                    "shortName": "fr-CA-AntoineNeural"
                },
                {
                    "name": "Jean",
                    "shortName": "fr-CA-JeanNeural"
                }
            ],
            "Female": [
                {
                    "name": "Sylvie",
                    "shortName": "fr-CA-SylvieNeural"
                }
            ]
        },
        "France": {
            "Female": [
                {
                    "name": "VivienneMultilingual",
                    "shortName": "fr-FR-VivienneMultilingualNeural"
                },
                {
                    "name": "Denise",
                    "shortName": "fr-FR-DeniseNeural"
                },
                {
                    "name": "Eloise",
                    "shortName": "fr-FR-EloiseNeural"
                }
            ],
            "Male": [
                {
                    "name": "RemyMultilingual",
                    "shortName": "fr-FR-RemyMultilingualNeural"
                },
                {
                    "name": "Henri",
                    "shortName": "fr-FR-HenriNeural"
                }
            ]
        },
        "Switzerland": {
            "Female": [
                {
                    "name": "Ariane",
                    "shortName": "fr-CH-ArianeNeural"
                }
            ],
            "Male": [
                {
                    "name": "Fabrice",
                    "shortName": "fr-CH-FabriceNeural"
                }
            ]
        }
    },
    "Galician": {
        "Spain": {
            "Male": [
                {
                    "name": "Roi",
                    "shortName": "gl-ES-RoiNeural"
                }
            ],
            "Female": [
                {
                    "name": "Sabela",
                    "shortName": "gl-ES-SabelaNeural"
                }
            ]
        }
    },
    "Georgian": {
        "Georgia": {
            "Female": [
                {
                    "name": "Eka",
                    "shortName": "ka-GE-EkaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Giorgi",
                    "shortName": "ka-GE-GiorgiNeural"
                }
            ]
        }
    },
    "German": {
        "Austria": {
            "Female": [
                {
                    "name": "Ingrid",
                    "shortName": "de-AT-IngridNeural"
                }
            ],
            "Male": [
                {
                    "name": "Jonas",
                    "shortName": "de-AT-JonasNeural"
                }
            ]
        },
        "Germany": {
            "Female": [
                {
                    "name": "SeraphinaMultilingual",
                    "shortName": "de-DE-SeraphinaMultilingualNeural"
                },
                {
                    "name": "Amala",
                    "shortName": "de-DE-AmalaNeural"
                },
                {
                    "name": "Katja",
                    "shortName": "de-DE-KatjaNeural"
                }
            ],
            "Male": [
                {
                    "name": "FlorianMultilingual",
                    "shortName": "de-DE-FlorianMultilingualNeural"
                },
                {
                    "name": "Conrad",
                    "shortName": "de-DE-ConradNeural"
                },
                {
                    "name": "Killian",
                    "shortName": "de-DE-KillianNeural"
                }
            ]
        },
        "Switzerland": {
            "Male": [
                {
                    "name": "Jan",
                    "shortName": "de-CH-JanNeural"
                }
            ],
            "Female": [
                {
                    "name": "Leni",
                    "shortName": "de-CH-LeniNeural"
                }
            ]
        }
    },
    "Greek": {
        "Greece": {
            "Female": [
                {
                    "name": "Athina",
                    "shortName": "el-GR-AthinaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Nestoras",
                    "shortName": "el-GR-NestorasNeural"
                }
            ]
        }
    },
    "Gujarati": {
        "India": {
            "Female": [
                {
                    "name": "Dhwani",
                    "shortName": "gu-IN-DhwaniNeural"
                }
            ],
            "Male": [
                {
                    "name": "Niranjan",
                    "shortName": "gu-IN-NiranjanNeural"
                }
            ]
        }
    },
    "Hebrew": {
        "Israel": {
            "Male": [
                {
                    "name": "Avri",
                    "shortName": "he-IL-AvriNeural"
                }
            ],
            "Female": [
                {
                    "name": "Hila",
                    "shortName": "he-IL-HilaNeural"
                }
            ]
        }
    },
    "Hindi": {
        "India": {
            "Male": [
                {
                    "name": "Madhur",
                    "shortName": "hi-IN-MadhurNeural"
                }
            ],
            "Female": [
                {
                    "name": "Swara",
                    "shortName": "hi-IN-SwaraNeural"
                }
            ]
        }
    },
    "Hungarian": {
        "Hungary": {
            "Female": [
                {
                    "name": "Noemi",
                    "shortName": "hu-HU-NoemiNeural"
                }
            ],
            "Male": [
                {
                    "name": "Tamas",
                    "shortName": "hu-HU-TamasNeural"
                }
            ]
        }
    },
    "Icelandic": {
        "Iceland": {
            "Female": [
                {
                    "name": "Gudrun",
                    "shortName": "is-IS-GudrunNeural"
                }
            ],
            "Male": [
                {
                    "name": "Gunnar",
                    "shortName": "is-IS-GunnarNeural"
                }
            ]
        }
    },
    "Indonesian": {
        "Indonesia": {
            "Male": [
                {
                    "name": "Ardi",
                    "shortName": "id-ID-ArdiNeural"
                }
            ],
            "Female": [
                {
                    "name": "Gadis",
                    "shortName": "id-ID-GadisNeural"
                }
            ]
        }
    },
    "Irish": {
        "Ireland": {
            "Male": [
                {
                    "name": "Colm",
                    "shortName": "ga-IE-ColmNeural"
                }
            ],
            "Female": [
                {
                    "name": "Orla",
                    "shortName": "ga-IE-OrlaNeural"
                }
            ]
        }
    },
    "Italian": {
        "Italy": {
            "Male": [
                {
                    "name": "Giuseppe",
                    "shortName": "it-IT-GiuseppeNeural"
                },
                {
                    "name": "Diego",
                    "shortName": "it-IT-DiegoNeural"
                }
            ],
            "Female": [
                {
                    "name": "Elsa",
                    "shortName": "it-IT-ElsaNeural"
                },
                {
                    "name": "Isabella",
                    "shortName": "it-IT-IsabellaNeural"
                }
            ]
        }
    },
    "Japanese": {
        "Japan": {
            "Male": [
                {
                    "name": "Keita",
                    "shortName": "ja-JP-KeitaNeural"
                }
            ],
            "Female": [
                {
                    "name": "Nanami",
                    "shortName": "ja-JP-NanamiNeural"
                }
            ]
        }
    },
    "Javanese": {
        "Indonesia": {
            "Male": [
                {
                    "name": "Dimas",
                    "shortName": "jv-ID-DimasNeural"
                }
            ],
            "Female": [
                {
                    "name": "Siti",
                    "shortName": "jv-ID-SitiNeural"
                }
            ]
        }
    },
    "Kannada": {
        "India": {
            "Male": [
                {
                    "name": "Gagan",
                    "shortName": "kn-IN-GaganNeural"
                }
            ],
            "Female": [
                {
                    "name": "Sapna",
                    "shortName": "kn-IN-SapnaNeural"
                }
            ]
        }
    },
    "Kazakh": {
        "Kazakhstan": {
            "Female": [
                {
                    "name": "Aigul",
                    "shortName": "kk-KZ-AigulNeural"
                }
            ],
            "Male": [
                {
                    "name": "Daulet",
                    "shortName": "kk-KZ-DauletNeural"
                }
            ]
        }
    },
    "Khmer": {
        "Cambodia": {
            "Male": [
                {
                    "name": "Piseth",
                    "shortName": "km-KH-PisethNeural"
                }
            ],
            "Female": [
                {
                    "name": "Sreymom",
                    "shortName": "km-KH-SreymomNeural"
                }
            ]
        }
    },
    "Korean": {
        "Korea": {
            "Male": [
                {
                    "name": "Hyunsu",
                    "shortName": "ko-KR-HyunsuNeural"
                },
                {
                    "name": "InJoon",
                    "shortName": "ko-KR-InJoonNeural"
                }
            ],
            "Female": [
                {
                    "name": "SunHi",
                    "shortName": "ko-KR-SunHiNeural"
                }
            ]
        }
    },
    "Lao": {
        "Laos": {
            "Male": [
                {
                    "name": "Chanthavong",
                    "shortName": "lo-LA-ChanthavongNeural"
                }
            ],
            "Female": [
                {
                    "name": "Keomany",
                    "shortName": "lo-LA-KeomanyNeural"
                }
            ]
        }
    },
    "Latvian": {
        "Latvia": {
            "Female": [
                {
                    "name": "Everita",
                    "shortName": "lv-LV-EveritaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Nils",
                    "shortName": "lv-LV-NilsNeural"
                }
            ]
        }
    },
    "Lithuanian": {
        "Lithuania": {
            "Male": [
                {
                    "name": "Leonas",
                    "shortName": "lt-LT-LeonasNeural"
                }
            ],
            "Female": [
                {
                    "name": "Ona",
                    "shortName": "lt-LT-OnaNeural"
                }
            ]
        }
    },
    "Macedonian": {
        "Republic of North Macedonia": {
            "Male": [
                {
                    "name": "Aleksandar",
                    "shortName": "mk-MK-AleksandarNeural"
                }
            ],
            "Female": [
                {
                    "name": "Marija",
                    "shortName": "mk-MK-MarijaNeural"
                }
            ]
        }
    },
    "Malay": {
        "Malaysia": {
            "Male": [
                {
                    "name": "Osman",
                    "shortName": "ms-MY-OsmanNeural"
                }
            ],
            "Female": [
                {
                    "name": "Yasmin",
                    "shortName": "ms-MY-YasminNeural"
                }
            ]
        }
    },
    "Malayalam": {
        "India": {
            "Male": [
                {
                    "name": "Midhun",
                    "shortName": "ml-IN-MidhunNeural"
                }
            ],
            "Female": [
                {
                    "name": "Sobhana",
                    "shortName": "ml-IN-SobhanaNeural"
                }
            ]
        }
    },
    "Maltese": {
        "Malta": {
            "Female": [
                {
                    "name": "Grace",
                    "shortName": "mt-MT-GraceNeural"
                }
            ],
            "Male": [
                {
                    "name": "Joseph",
                    "shortName": "mt-MT-JosephNeural"
                }
            ]
        }
    },
    "Marathi": {
        "India": {
            "Female": [
                {
                    "name": "Aarohi",
                    "shortName": "mr-IN-AarohiNeural"
                }
            ],
            "Male": [
                {
                    "name": "Manohar",
                    "shortName": "mr-IN-ManoharNeural"
                }
            ]
        }
    },
    "Mongolian": {
        "Mongolia": {
            "Male": [
                {
                    "name": "Bataa",
                    "shortName": "mn-MN-BataaNeural"
                }
            ],
            "Female": [
                {
                    "name": "Yesui",
                    "shortName": "mn-MN-YesuiNeural"
                }
            ]
        }
    },
    "Nepali": {
        "Nepal": {
            "Female": [
                {
                    "name": "Hemkala",
                    "shortName": "ne-NP-HemkalaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Sagar",
                    "shortName": "ne-NP-SagarNeural"
                }
            ]
        }
    },
    "Norwegian": {
        "Bokmål Norway": {
            "Male": [
                {
                    "name": "Finn",
                    "shortName": "nb-NO-FinnNeural"
                }
            ]
        },
        "Bokmål, Norway": {
            "Female": [
                {
                    "name": "Pernille",
                    "shortName": "nb-NO-PernilleNeural"
                }
            ]
        }
    },
    "Pashto": {
        "Afghanistan": {
            "Male": [
                {
                    "name": "GulNawaz",
                    "shortName": "ps-AF-GulNawazNeural"
                }
            ],
            "Female": [
                {
                    "name": "Latifa",
                    "shortName": "ps-AF-LatifaNeural"
                }
            ]
        }
    },
    "Persian": {
        "Iran": {
            "Female": [
                {
                    "name": "Dilara",
                    "shortName": "fa-IR-DilaraNeural"
                }
            ],
            "Male": [
                {
                    "name": "Farid",
                    "shortName": "fa-IR-FaridNeural"
                }
            ]
        }
    },
    "Polish": {
        "Poland": {
            "Male": [
                {
                    "name": "Marek",
                    "shortName": "pl-PL-MarekNeural"
                }
            ],
            "Female": [
                {
                    "name": "Zofia",
                    "shortName": "pl-PL-ZofiaNeural"
                }
            ]
        }
    },
    "Portuguese": {
        "Brazil": {
            "Female": [
                {
                    "name": "Thalita",
                    "shortName": "pt-BR-ThalitaNeural"
                },
                {
                    "name": "Francisca",
                    "shortName": "pt-BR-FranciscaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Antonio",
                    "shortName": "pt-BR-AntonioNeural"
                }
            ]
        },
        "Portugal": {
            "Male": [
                {
                    "name": "Duarte",
                    "shortName": "pt-PT-DuarteNeural"
                }
            ],
            "Female": [
                {
                    "name": "Raquel",
                    "shortName": "pt-PT-RaquelNeural"
                }
            ]
        }
    },
    "Romanian": {
        "Romania": {
            "Female": [
                {
                    "name": "Alina",
                    "shortName": "ro-RO-AlinaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Emil",
                    "shortName": "ro-RO-EmilNeural"
                }
            ]
        }
    },
    "Russian": {
        "Russia": {
            "Male": [
                {
                    "name": "Dmitry",
                    "shortName": "ru-RU-DmitryNeural"
                }
            ],
            "Female": [
                {
                    "name": "Svetlana",
                    "shortName": "ru-RU-SvetlanaNeural"
                }
            ]
        }
    },
    "Serbian": {
        "Serbia": {
            "Male": [
                {
                    "name": "Nicholas",
                    "shortName": "sr-RS-NicholasNeural"
                }
            ],
            "Female": [
                {
                    "name": "Sophie",
                    "shortName": "sr-RS-SophieNeural"
                }
            ]
        }
    },
    "Sinhala": {
        "Sri Lanka": {
            "Male": [
                {
                    "name": "Sameera",
                    "shortName": "si-LK-SameeraNeural"
                }
            ],
            "Female": [
                {
                    "name": "Thilini",
                    "shortName": "si-LK-ThiliniNeural"
                }
            ]
        }
    },
    "Slovak": {
        "Slovakia": {
            "Male": [
                {
                    "name": "Lukas",
                    "shortName": "sk-SK-LukasNeural"
                }
            ],
            "Female": [
                {
                    "name": "Viktoria",
                    "shortName": "sk-SK-ViktoriaNeural"
                }
            ]
        }
    },
    "Slovenian": {
        "Slovenia": {
            "Female": [
                {
                    "name": "Petra",
                    "shortName": "sl-SI-PetraNeural"
                }
            ],
            "Male": [
                {
                    "name": "Rok",
                    "shortName": "sl-SI-RokNeural"
                }
            ]
        }
    },
    "Somali": {
        "Somalia": {
            "Male": [
                {
                    "name": "Muuse",
                    "shortName": "so-SO-MuuseNeural"
                }
            ],
            "Female": [
                {
                    "name": "Ubax",
                    "shortName": "so-SO-UbaxNeural"
                }
            ]
        }
    },
    "Spanish": {
        "Argentina": {
            "Female": [
                {
                    "name": "Elena",
                    "shortName": "es-AR-ElenaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Tomas",
                    "shortName": "es-AR-TomasNeural"
                }
            ]
        },
        "Bolivia": {
            "Male": [
                {
                    "name": "Marcelo",
                    "shortName": "es-BO-MarceloNeural"
                }
            ],
            "Female": [
                {
                    "name": "Sofia",
                    "shortName": "es-BO-SofiaNeural"
                }
            ]
        },
        "Chile": {
            "Female": [
                {
                    "name": "Catalina",
                    "shortName": "es-CL-CatalinaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Lorenzo",
                    "shortName": "es-CL-LorenzoNeural"
                }
            ]
        },
        "Colombia": {
            "Female": [
                {
                    "name": "Ximena",
                    "shortName": "es-ES-XimenaNeural"
                },
                {
                    "name": "Salome",
                    "shortName": "es-CO-SalomeNeural"
                }
            ],
            "Male": [
                {
                    "name": "Gonzalo",
                    "shortName": "es-CO-GonzaloNeural"
                }
            ]
        },
        "Costa Rica": {
            "Male": [
                {
                    "name": "Juan",
                    "shortName": "es-CR-JuanNeural"
                }
            ],
            "Female": [
                {
                    "name": "Maria",
                    "shortName": "es-CR-MariaNeural"
                }
            ]
        },
        "Cuba": {
            "Female": [
                {
                    "name": "Belkys",
                    "shortName": "es-CU-BelkysNeural"
                }
            ],
            "Male": [
                {
                    "name": "Manuel",
                    "shortName": "es-CU-ManuelNeural"
                }
            ]
        },
        "Dominican Republic": {
            "Male": [
                {
                    "name": "Emilio",
                    "shortName": "es-DO-EmilioNeural"
                }
            ],
            "Female": [
                {
                    "name": "Ramona",
                    "shortName": "es-DO-RamonaNeural"
                }
            ]
        },
        "Ecuador": {
            "Female": [
                {
                    "name": "Andrea",
                    "shortName": "es-EC-AndreaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Luis",
                    "shortName": "es-EC-LuisNeural"
                }
            ]
        },
        "El Salvador": {
            "Female": [
                {
                    "name": "Lorena",
                    "shortName": "es-SV-LorenaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Rodrigo",
                    "shortName": "es-SV-RodrigoNeural"
                }
            ]
        },
        "Equatorial Guinea": {
            "Male": [
                {
                    "name": "Javier",
                    "shortName": "es-GQ-JavierNeural"
                }
            ],
            "Female": [
                {
                    "name": "Teresa",
                    "shortName": "es-GQ-TeresaNeural"
                }
            ]
        },
        "Guatemala": {
            "Male": [
                {
                    "name": "Andres",
                    "shortName": "es-GT-AndresNeural"
                }
            ],
            "Female": [
                {
                    "name": "Marta",
                    "shortName": "es-GT-MartaNeural"
                }
            ]
        },
        "Honduras": {
            "Male": [
                {
                    "name": "Carlos",
                    "shortName": "es-HN-CarlosNeural"
                }
            ],
            "Female": [
                {
                    "name": "Karla",
                    "shortName": "es-HN-KarlaNeural"
                }
            ]
        },
        "Mexico": {
            "Female": [
                {
                    "name": "Dalia",
                    "shortName": "es-MX-DaliaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Jorge",
                    "shortName": "es-MX-JorgeNeural"
                }
            ]
        },
        "Nicaragua": {
            "Male": [
                {
                    "name": "Federico",
                    "shortName": "es-NI-FedericoNeural"
                }
            ],
            "Female": [
                {
                    "name": "Yolanda",
                    "shortName": "es-NI-YolandaNeural"
                }
            ]
        },
        "Panama": {
            "Female": [
                {
                    "name": "Margarita",
                    "shortName": "es-PA-MargaritaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Roberto",
                    "shortName": "es-PA-RobertoNeural"
                }
            ]
        },
        "Paraguay": {
            "Male": [
                {
                    "name": "Mario",
                    "shortName": "es-PY-MarioNeural"
                }
            ],
            "Female": [
                {
                    "name": "Tania",
                    "shortName": "es-PY-TaniaNeural"
                }
            ]
        },
        "Peru": {
            "Male": [
                {
                    "name": "Alex",
                    "shortName": "es-PE-AlexNeural"
                }
            ],
            "Female": [
                {
                    "name": "Camila",
                    "shortName": "es-PE-CamilaNeural"
                }
            ]
        },
        "Puerto Rico": {
            "Female": [
                {
                    "name": "Karina",
                    "shortName": "es-PR-KarinaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Victor",
                    "shortName": "es-PR-VictorNeural"
                }
            ]
        },
        "Spain": {
            "Male": [
                {
                    "name": "Alvaro",
                    "shortName": "es-ES-AlvaroNeural"
                }
            ],
            "Female": [
                {
                    "name": "Elvira",
                    "shortName": "es-ES-ElviraNeural"
                }
            ]
        },
        "United States": {
            "Male": [
                {
                    "name": "Alonso",
                    "shortName": "es-US-AlonsoNeural"
                }
            ],
            "Female": [
                {
                    "name": "Paloma",
                    "shortName": "es-US-PalomaNeural"
                }
            ]
        },
        "Uruguay": {
            "Male": [
                {
                    "name": "Mateo",
                    "shortName": "es-UY-MateoNeural"
                }
            ],
            "Female": [
                {
                    "name": "Valentina",
                    "shortName": "es-UY-ValentinaNeural"
                }
            ]
        },
        "Venezuela": {
            "Female": [
                {
                    "name": "Paola",
                    "shortName": "es-VE-PaolaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Sebastian",
                    "shortName": "es-VE-SebastianNeural"
                }
            ]
        }
    },
    "Sundanese": {
        "Indonesia": {
            "Male": [
                {
                    "name": "Jajang",
                    "shortName": "su-ID-JajangNeural"
                }
            ],
            "Female": [
                {
                    "name": "Tuti",
                    "shortName": "su-ID-TutiNeural"
                }
            ]
        }
    },
    "Swahili": {
        "Kenya": {
            "Male": [
                {
                    "name": "Rafiki",
                    "shortName": "sw-KE-RafikiNeural"
                }
            ],
            "Female": [
                {
                    "name": "Zuri",
                    "shortName": "sw-KE-ZuriNeural"
                }
            ]
        },
        "Tanzania": {
            "Male": [
                {
                    "name": "Daudi",
                    "shortName": "sw-TZ-DaudiNeural"
                }
            ],
            "Female": [
                {
                    "name": "Rehema",
                    "shortName": "sw-TZ-RehemaNeural"
                }
            ]
        }
    },
    "Swedish": {
        "Sweden": {
            "Male": [
                {
                    "name": "Mattias",
                    "shortName": "sv-SE-MattiasNeural"
                }
            ],
            "Female": [
                {
                    "name": "Sofie",
                    "shortName": "sv-SE-SofieNeural"
                }
            ]
        }
    },
    "Tamil": {
        "India": {
            "Female": [
                {
                    "name": "Pallavi",
                    "shortName": "ta-IN-PallaviNeural"
                }
            ],
            "Male": [
                {
                    "name": "Valluvar",
                    "shortName": "ta-IN-ValluvarNeural"
                }
            ]
        },
        "Malaysia": {
            "Female": [
                {
                    "name": "Kani",
                    "shortName": "ta-MY-KaniNeural"
                }
            ],
            "Male": [
                {
                    "name": "Surya",
                    "shortName": "ta-MY-SuryaNeural"
                }
            ]
        },
        "Singapore": {
            "Male": [
                {
                    "name": "Anbu",
                    "shortName": "ta-SG-AnbuNeural"
                }
            ],
            "Female": [
                {
                    "name": "Venba",
                    "shortName": "ta-SG-VenbaNeural"
                }
            ]
        },
        "Sri Lanka": {
            "Male": [
                {
                    "name": "Kumar",
                    "shortName": "ta-LK-KumarNeural"
                }
            ],
            "Female": [
                {
                    "name": "Saranya",
                    "shortName": "ta-LK-SaranyaNeural"
                }
            ]
        }
    },
    "Telugu": {
        "India": {
            "Male": [
                {
                    "name": "Mohan",
                    "shortName": "te-IN-MohanNeural"
                }
            ],
            "Female": [
                {
                    "name": "Shruti",
                    "shortName": "te-IN-ShrutiNeural"
                }
            ]
        }
    },
    "Thai": {
        "Thailand": {
            "Male": [
                {
                    "name": "Niwat",
                    "shortName": "th-TH-NiwatNeural"
                }
            ],
            "Female": [
                {
                    "name": "Premwadee",
                    "shortName": "th-TH-PremwadeeNeural"
                }
            ]
        }
    },
    "Turkish": {
        "Turkey": {
            "Male": [
                {
                    "name": "Ahmet",
                    "shortName": "tr-TR-AhmetNeural"
                }
            ],
            "Female": [
                {
                    "name": "Emel",
                    "shortName": "tr-TR-EmelNeural"
                }
            ]
        }
    },
    "Ukrainian": {
        "Ukraine": {
            "Male": [
                {
                    "name": "Ostap",
                    "shortName": "uk-UA-OstapNeural"
                }
            ],
            "Female": [
                {
                    "name": "Polina",
                    "shortName": "uk-UA-PolinaNeural"
                }
            ]
        }
    },
    "Urdu": {
        "India": {
            "Female": [
                {
                    "name": "Gul",
                    "shortName": "ur-IN-GulNeural"
                }
            ],
            "Male": [
                {
                    "name": "Salman",
                    "shortName": "ur-IN-SalmanNeural"
                }
            ]
        },
        "Pakistan": {
            "Male": [
                {
                    "name": "Asad",
                    "shortName": "ur-PK-AsadNeural"
                }
            ],
            "Female": [
                {
                    "name": "Uzma",
                    "shortName": "ur-PK-UzmaNeural"
                }
            ]
        }
    },
    "Uzbek": {
        "Uzbekistan": {
            "Female": [
                {
                    "name": "Madina",
                    "shortName": "uz-UZ-MadinaNeural"
                }
            ],
            "Male": [
                {
                    "name": "Sardor",
                    "shortName": "uz-UZ-SardorNeural"
                }
            ]
        }
    },
    "Vietnamese": {
        "Vietnam": {
            "Female": [
                {
                    "name": "HoaiMy",
                    "shortName": "vi-VN-HoaiMyNeural"
                }
            ],
            "Male": [
                {
                    "name": "NamMinh",
                    "shortName": "vi-VN-NamMinhNeural"
                }
            ]
        }
    },
    "Welsh": {
        "United Kingdom": {
            "Male": [
                {
                    "name": "Aled",
                    "shortName": "cy-GB-AledNeural"
                }
            ],
            "Female": [
                {
                    "name": "Nia",
                    "shortName": "cy-GB-NiaNeural"
                }
            ]
        }
    },
    "Zulu": {
        "South Africa": {
            "Female": [
                {
                    "name": "Thando",
                    "shortName": "zu-ZA-ThandoNeural"
                }
            ],
            "Male": [
                {
                    "name": "Themba",
                    "shortName": "zu-ZA-ThembaNeural"
                }
            ]
        }
    }
}