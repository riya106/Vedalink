'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "hi" | "sa";

type Dict = Record<string, Record<Lang, string>>;

const dict: Dict = {
  // nav
  "nav.home": { en: "Home", hi: "होम", sa: "गृहपृष्ठ" },
  "nav.learn": { en: "Learn", hi: "सीखें", sa: "अध्ययनम्" },
  "nav.producers": { en: "Producers", hi: "उत्पादक", sa: "उत्पादकाः" },
  "nav.dashboard": { en: "Dashboard", hi: "डैशबोर्ड", sa: "डैशबोर्ड" },
  "nav.about": { en: "About", hi: "हमारे बारे में", sa: "विषये" },
  "nav.login": { en: "Sign In", hi: "लॉगिन", sa: "प्रवेशः" },

  // hero
  "hero.badge": { en: "Farmer-first transparency", hi: "किसान-प्रथम पारदर्शिता", sa: "कृषकप्रथम पारदर्शिता" },
  "hero.title": { en: "Know your food. Trust your farmers.", hi: "अपना भोजन जानें। अपने किसानों पर भरोसा करें।", sa: "स्वं भोजनं जानातु। कृषकेषु विश्वासः।" },
  "hero.subtitle": {
    en: "VedaLink helps farmers and buyers prove origin, quality, and fair practices with a secure, tamper‑evident supply chain. Scan a code or enter a batch ID to see every step from farm to fork.",
    hi: "VedaLink सुरक्षित, छेड़छाड़‑सुस्पष्ट सप्लाई चेन द्वारा मूल, गुणवत्ता व निष्पक्षता सिद्ध करने में किसानों व खरीदारों की सहायता करता है। हर चरण देखने हेतु कोड स्कैन करें या बैच ID दर्ज करें।",
    sa: "VedaLink सुरक्षित-अपरिवर्त्य-शृंखलया मूलं गुणवत्तां च न्यायाचारान् प्रम��णयितुं कृषक-क्रेतृभ्यां सहायं करोति। प्रत्येकं चरणं द्रष्टुं कूटं स्कैन कृत्वा वा समूहम् ID प्रविशति।",
  },
  "hero.loginCta": { en: "Login to Dashboard", hi: "डैशबोर्ड में लॉगिन करें", sa: "डैशबोर्ड‑प्रवेशः" },
  "hero.learnMore": { en: "Learn more", hi: "और जानें", sa: "अधिकं जानातु" },
  "hero.pill.simple": { en: "Simple for farmers", hi: "किसानों के लिए सरल", sa: "कृषकानां कृते सरलम्" },
  "hero.pill.tamper": { en: "Tamper-proof records", hi: "छेड़छाड़‑रोधी अभिलेख", sa: "अपरिवर्त्य अभिलेखाः" },
  "hero.pill.qr": { en: "QR codes for buyers", hi: "खरीदारों हेतु QR कोड", sa: "क्रेतॄणां कृते QR संकेताः" },

  // collage
  "collage.farm.tag": { en: "Farm fresh", hi: "खेत से ताज़ा", sa: "कृषिक्षेत्रात् ताजम्" },
  "collage.farm.cap": { en: "Verified origin and certifications", hi: "सत्यापित मूल व प्रमाणपत्र", sa: "सत्यापितम् उद्गमं प्रमाणपत्राणि च" },
  "collage.log.tag": { en: "Logistics", hi: "लॉजिस्टिक्स", sa: "परिवहन" },
  "collage.log.cap": { en: "Cold-chain and handover events", hi: "कोल्ड‑चेन व हस्तांतरण घटनाएँ", sa: "शीत-शृंखला हस्तान्तरण-घटनाः" },
  "collage.chain.tag": { en: "On‑chain", hi: "ऑन‑चेन", sa: "श्रृंखलायां" },
  "collage.chain.cap": { en: "Signed, immutable records", hi: "हस्ताक्षरित, अपरिवर्तनीय अभिलेख", sa: "हस्ताक्षरिताः अपरिवर्त्याः अभिलेखाः" },

  // traceability section
  "trace.title": { en: "Traceability & flow", hi: "ट्रेसबिलिटी और प्रवाह", sa: "अनुगमनम् च प्रवाहः" },
  "flow.step.farm": { en: "Farm", hi: "फार्म", sa: "कृषिक्षेत्रम्" },
  "flow.step.collection": { en: "Collection", hi: "संग्रह", sa: "संग्रहः" },
  "flow.step.process": { en: "Process", hi: "प्रसंस्करण", sa: "संस्करणम्" },
  "flow.step.logistics": { en: "Logistics", hi: "लॉजिस्टिक्स", sa: "परिवहन" },
  "flow.step.retail": { en: "Retail", hi: "खुदरा", sa: "खुद्र-विक्रयः" },
  "flow.step.scan": { en: "Scan", hi: "स्कैन", sa: "स्कैन" },

  "flow.card.farm.title": { en: "Farm harvest", hi: "फार्म हार्वेस्ट", sa: "कृषिक्षेत्र-श्रवणम्" },
  "flow.card.farm.desc": { en: "Farmer creates a batch with geotag, crop variety, and organic certificates reference.", hi: "किसान जियोटैग, फसल किस्म और ऑर्गेनिक प्रमाणपत्र संदर्भ सहित बैच बनाता है।", sa: "कृषकः जियो-चिह्नेन सह समूहम् निर्माति, बीज-विविधिः प्रमाणपत्र-संदर्भश्च।" },
  "flow.card.collection.title": { en: "Collection & QA", hi: "संग्रह व गुण���त्ता", sa: "संग्रहः तथा गुणवच्चता" },
  "flow.card.collection.desc": { en: "Coop weighs, inspects, and appends a signed receipt referring to the farm batch.", hi: "समिति वजन, निरीक्षण करती है और फार्म बैच का संदर्भ देते हुए हस्ताक्षरित रसीद जोड़ती है।", sa: "समिति तौलनं निरीक्षणं च कृत्वा हस्ताक्षरित-रसीदं योजयति।" },
  "flow.card.process.title": { en: "Processing", hi: "प्रसंस्करण", sa: "संस्करणम्" },
  "flow.card.process.desc": { en: "Plant washes and packs, recording sanitation checks and lot IDs.", hi: "प्लांट धुलाई व पैकिंग करता है, सेनिटेशन जाँच व लॉट ID दर्ज करता है।", sa: "संस्था प्रक्षालयति संहिनोति च, शुचिता-परीक्षा लॉट-ID च लिखति।" },
  "flow.card.logistics.title": { en: "Logistics", hi: "लॉजिस्टिक्स", sa: "परिव��न" },
  "flow.card.logistics.desc": { en: "Transport logs route and handovers; cold‑chain sensors commit summaries to the ledger.", hi: "परिवहन मार्ग व हस्तांतरण दर्ज; कोल्ड‑चेन सेंसर सारांश लेखाजोखे में जोड़ते हैं।", sa: "मार्गं हस्तान्तरणं च लेखयति; शीत-शृंखला-संवेदा सारांशं निधाने स्थापयन्ति।" },
  "flow.card.retail.title": { en: "Retail", hi: "खुदरा", sa: "खुद्र-विक्रयः" },
  "flow.card.retail.desc": { en: "Retail verifies integrity, stocks shelves, and prints consumer QR labels.", hi: "खुदरा अखंडता जाँचता, शेल्फ भरता और उपभोक्ता QR लेबल छापता है।", sa: "खुद्रो विक्रेताः सत्यतां परीक्ष्य पात्राणि पूरयति QR-लेबलं छापयति।" },
  "flow.card.scan.title": { en: "Consumer scan", hi: "उपभोक्ता स्कैन", sa: "उपभोक्ता-स्कैन" },
  "flow.card.scan.desc": { en: "Buyers scan to view the journey with privacy‑preserving proofs of authenticity.", hi: "खरीदार यात्रा देखने हेतु स्कैन करते हैं, गोपनीयता‑सुरक्षित प्रमाण सहित।", sa: "क्रेतारः गोपनीयता-रक्षया सह सत्यता-प्रमाणैः सह यात्रां पश्यन्ति।" },

  // trust
  "trust.title": { en: "Trust through transparency", hi: "पारदर्शिता से भरोसा", sa: "पारदर्शितया विश्वासः" },
  "trust.desc": { en: "We combine on‑farm capture, verified documents, and public proofs so every stakeholder can independently verify claims without exposing private business data.", hi: "हम ऑन‑फार्म कैप्चर, सत्यापित दस्तावेज़ और सार्वजनिक प्रमाण जोड़ते हैं ताकि सभी दावों की स्वतंत्र जाँच हो सके—बिना निजी व्यावसायिक डेटा उजागर किए।", sa: "वयं क्षेत्रे सङ्ग्र���म् प्रमाणपत्राणि च सार्वजनिक‑प्रमाणैः सह संयोजयामः, यत् सर्वे स्वातन्त्र्येण दाव्यान् परीक्षेयुः।" },
  "trust.scan.title": { en: "Scan and verify instantly", hi: "तुरंत स्कैन और सत्यापित करें", sa: "तत्क्षणं स्कैन् कृत्वा परीक्षताम्" },
  "trust.scan.p1": { en: "QR codes on packs link to a tamper‑evident trail", hi: "पैकेट पर QR कोड छेड़छाड़‑सुस्पष्ट ट्रेल से जुड़े", sa: "पुटकेषु QR‑संकेताः अपरिवर्त्य‑मार्गे संयोजिताः" },
  "trust.scan.p2": { en: "See origin farm, harvest date, and handling events", hi: "मूल फार्म, हार्वेस्ट तिथि व हैंडलिंग घटनाएँ देखें", sa: "उद्गम‑क्षेत्रं हार्वेस्ट‑तिथिं व्यवहार‑घटनाश्च पश्यतु" },
  "trust.scan.p3": { en: "Works offline with later sync for rural connectivity", hi: "ग्रामीण कनेक्टिविटी हेतु ऑफ़लाइन भी कार्य; बाद में सिंक", sa: "अपसञ्चारे अपि कार्यं, अनन्तरं समन्वयः" },
  "trust.quality.title": { en: "Proof of quality and compliance", hi: "गुणवत्ता व अनुपालन का प्रमाण", sa: "गुणवत्ता‑अनुपालनस्य प्रमाणम्" },
  "trust.quality.p1": { en: "Attach signed lab tests and certifications", hi: "हस्ताक्षरित लैब टेस्ट व प्रमाणपत्र जोड़ें", sa: "प्रयोगशाला‑परीक्षा प्रमाणपत्रं च योजयतु" },
  "trust.quality.p2": { en: "Cryptographic hashes prevent undetected edits", hi: "क्रिप्टोग्राफिक हैश से छुपे बदलाव असम्भव", sa: "गूढलेखन‑हैशः परिवर्तने निषेधति" },
  "trust.quality.p3": { en: "Role‑based access keeps sensitive fields private", hi: "भूमिका‑आधारित पहुँच से संवेदनशील क्षेत्र सुरक्षित", sa: "भूमिका‑आधारित‑अधिकारैः गोपनीय‑विभागाः सुरक्षिताः" },
  "trust.history.title": { en: "Transparent, auditable history", hi: "पारदर्शी, लेखापरीक्षित इतिहास", sa: "पारदर्शी परीक्षित‑इतिहासः" },
  "trust.history.p1": { en: "Every event is time‑stamped and attributable", hi: "हर घटना समय‑चिह्नित व उत्तरदायी", sa: "प्रत्येका घटना काल‑मुद्रिता उत्तरदायिनी च" },
  "trust.history.p2": { en: "Third parties can audit without vendor lock‑in", hi: "तृतीय पक्ष बिना विक्रेता‑निर्भरता के ऑडिट कर सकते हैं", sa: "तृतीयाः स्वातन्त्र्येण परीक्षयितुं शक्नुवन्ति" },
  "trust.history.p3": { en: "APIs export trace data to existing ERPs", hi: "API विद्यमान ERP में ट्रेस डेटा निर्यात", sa: "API वर्तमान‑ERPषु दत्तांशं निर्यस्यन्ति" },
  "trust.fair.title": { en: "Fair trade, protected data", hi: "फेयर ट्रेड, सुरक्षित डेटा", sa: "न्याय्य‑वाणिज्यं, सुरक्षित‑दत्तांशः" },
  "trust.fair.p1": { en: "Privacy‑preserving proofs share only what’s needed", hi: "गोपनीयता‑संरक्षक प्रमाण केवल आवश्यक ही साझा", sa: "गोपनीयता‑रक्षण‑प्रमाणैः आवश्यकं केवलं साझ्यते" },
  "trust.fair.p2": { en: "Buyers reward verified practices with premiums", hi: "खरीदार सत्यापित प्रथाओं को प्रीमियम देते हैं", sa: "क्रेतारः सत्यापित‑आचरनेभ्यः प्रीमियम् ददति" },
  "trust.fair.p3": { en: "Communities build trust with consistent data", hi: "समुदाय समान डेटा से भरोसा बनाते हैं", sa: "समुदायाः सुसङ्गत‑दत्तांशेन विश्वासं निर्मान्ति" },

  // why
  "why.title": { en: "Why it matters", hi: "यह क्यों महत्वपूर्ण है", sa: "किमर्थं महत्वपूर्णम्" },
  "why.farmer.title": { en: "Farmer-friendly", hi: "किसान‑हितैषी", sa: "कृषक‑हितैषी" },
  "why.farmer.desc": { en: "Offline capture and SMS fallback so no one is left out.", hi: "ऑफ़लाइन कैप्चर व SMS विकल्प—कोई न छूटे।", sa: "अपसञ्चारे अपि संग्रहः, SMS विकल्पः—कोऽपि न त्यज्यते।" },
  "why.tamper.title": { en: "Tamper-proof", hi: "छेड़छाड़‑रोधी", sa: "अपरिवर्त्य" },
  "why.tamper.desc": { en: "Every event is signed and anchored for easy verification.", hi: "हर घटना हस्ताक्षरित व सुरक्षित—सहज सत्यापन।", sa: "प्रत्येका घटना हस्ताक्षरिता निबद्धा च—सुलभ‑परीक्षणाय।" },
  "why.qr.title": { en: "QR transparency", hi: "QR पारदर्शिता", sa: "QR पारदर्शिता" },
  "why.qr.desc": { en: "Buyers scan to see origin, certifications, and history.", hi: "खरीदार मूल, प्रमाणपत्र व इतिहास देखने हेतु स्कैन क��ें।", sa: "क्रेतारः उद्गमं प्रमाणपत्रं इतिहासं च द्रष्टुं स्कैन कुर्वन्ति।" },

  // about
  "about.title": { en: "About VedaLink", hi: "VedaLink के बारे में", sa: "VedaLink विषये" },
  "about.hero.sub": { en: "We help farmers and buyers prove origin, quality, and fair practices with a secure, tamper‑evident supply chain. Our mission is to make trust effortless—from farm to fork.", hi: "हम सुरक्षित, छेड़छाड़‑सुस्पष्ट आपूर्ति शृंखला से मूल, गुणवत्ता व निष्पक्षता सिद्ध करने में सहायता करते हैं। हमारा लक्ष्य—फार्म से फोर्क तक भरोसा सरल बनाना।", sa: "वयं सुरक्षित‑अपरिवर्त्य‑शृंखलया मूलं गुणवत्तां च न्यायाचारान् प्रमाणयितुम् सहायं कुर्मः। अस्माकं ध्येयम्—क्षेत्रात् भोजनपर्यन्त��� सरलः विश्वासः।" },
  "about.farmerfirst.title": { en: "Farmer-first by design", hi: "डिज़ाइन से किसान‑प्रथम", sa: "निरूपणतः कृषक‑प्रथम" },
  "about.farmerfirst.desc": { en: "VedaLink is built with and for producers. Offline capture and simple QR flows ensure participation without smartphones or constant connectivity. Cooperatives and processors add quality checks and handovers—all cryptographically linked.", hi: "VedaLink उत्पादकों के साथ व उनके लिए बना है। ऑफ़लाइन कैप्चर व सरल QR प्रवाह से बिना स्मार्टफोन/निरंतर कनेक्टिविटी के भी भागीदारी संभव। समितियाँ व प्रोसेसर गुणवत्ता जाँच व हस्तांतरण जोड़ते हैं—सब क्रिप्टोग्राफ़िक रूप से जुड़ा।", sa: "VedaLink उत्पादकैः सह उत्पादकानां कृते निर्मितम्। अपसञ्चारे अपि संग्रहः सरलाः QR‑प्रव���हाश्च भागीदारीं सुनिश्चितयन्ति। समितयः संसाधकाः च गुणवत्ता‑परीक्षा हस्तान्तरणं च योजयन्ति—सर्वं गूढलेखन‑सम्बद्धम्।" },
  "about.stats.producers": { en: "Producers onboarded", hi: "जुड़े हुए उत्पादक", sa: "समाविष्टाः उत्पादकाः" },
  "about.stats.batches": { en: "Verified batches", hi: "सत्यापित बैच", sa: "सत्यापित‑समूहाः" },
  "about.stats.scans": { en: "Retail scans", hi: "खुदरा स्कैन", sa: "खुद्र‑स्कैन" },
  "about.values.title": { en: "What we value", hi: "हमारे मूल्य", sa: "मूल्यानि" },

  // producers
  "producers.title": { en: "Our producers", hi: "हमारे उत्पादक", sa: "अस्माकं उत्पादकाः" },
  "producers.desc": { en: "Meet verified producers on VedaLink. Each profile includes location, crops, certifications, contact info, farming methods, acreage, harvest recency, and a gallery.", hi: "VedaLink पर सत्��ापित उत्पादकों से मिलें। प्रत्येक प्रोफ़ाइल में स्थान, फसलें, प्रमाणपत्र, संपर्क, कृषि‑विधियाँ, क्षेत्रफल, हाल का हार्वेस्ट और गैलरी सम्मिलित।", sa: "VedaLink इत्यत्र सत्यापित‑उत्पादकान् पश्यन्तु। प्रोफाइल्सु स्थानं, कृषिः, प्रमाणपत्राणि, सम्पर्कः, कृषिविधानि, क्षेत्रफलम्, ताज़ा हार्वेस्टः, चित्रगृहं च।" },
  "producers.fact.acreage": { en: "Acreage", hi: "क्षेत्रफल", sa: "क्षेत्रफलम्" },
  "producers.fact.since": { en: "Since", hi: "से", sa: "प्रभृति" },
  "producers.fact.batches": { en: "Batches", hi: "बैच", sa: "समूहाः" },
  "producers.fact.last": { en: "Last harvest", hi: "अंतिम हार्वेस्ट", sa: "अन्तिम‑सम्हारः" },
  "producers.viewTrace": { en: "View trace", hi: "ट्रेस देखें", sa: "अनुगमनं पश्यतु" },

  // dashboard
  "dash.title": { en: "Farmer Dashboard", hi: "किसान डैशबोर्ड", sa: "कृषक‑डैशबोर्ड" },
  "dash.tab.batches": { en: "Batches", hi: "बैच", sa: "समूहाः" },
  "dash.tab.sales": { en: "Sales & Earnings", hi: "बिक्री व आय", sa: "विक्रयः आयश्च" },
  "dash.tab.requests": { en: "Requests", hi: "अनुरोध", sa: "आवेदनानि" },
  "dash.tab.help": { en: "Help/Support", hi: "सहायता/समर्थन", sa: "सहाय्यम्/समर्थनम्" },
  "dash.logout": { en: "Log out", hi: "लॉगआउट", sa: "निर्गमनम्" },
  "dash.add.title": { en: "Add new batch", hi: "नया बैच जोड़ें", sa: "नूतनः समूहः योज्यताम्" },
  "dash.add.add": { en: "Add", hi: "जोड़ें", sa: "योजयतु" },
  "dash.add.close": { en: "Close", hi: "बन्द करें", sa: "पिधायतु" },
  "dash.form.productType": { en: "Product type", hi: "उत्पाद प्रक��र", sa: "उत्पाद-��ेदः" },
  "dash.form.name": { en: "Name", hi: "नाम", sa: "नाम" },
  "dash.form.quality": { en: "Quality", hi: "गुणवत्ता", sa: "गुणवत्ता" },
  "dash.form.price": { en: "Price (₹)", hi: "मूल्य (₹)", sa: "मूल्य (₹)" },
  "dash.form.submit": { en: "Create batch", hi: "बैच बनाएं", sa: "समूहं निर्मातु" },
  "dash.form.generating": { en: "Generating QR…", hi: "QR बना रहा…", sa: "QR उत्पाद्यते…" },
  "dash.form.batchQr": { en: "Batch QR", hi: "बैच QR", sa: "समूह‑QR" },
  "dash.table.title": { en: "My batches", hi: "मेरे बैच", sa: "मम समूहाः" },
  "dash.table.batchId": { en: "Batch ID", hi: "बैच ID", sa: "समूह-ID" },
  "dash.table.product": { en: "Product", hi: "उत्पाद", sa: "उत्पादः" },
  "dash.table.quality": { en: "Quality", hi: "गुणवत्ता", sa: "गुणवत्ता" },
  "dash.table.price": { en: "Price", hi: "मूल्य", sa: "मूल्यः" },
  "dash.table.status": { en: "Status", hi: "स्थिति", sa: "स्���ितिः" },
  "dash.table.actions": { en: "Actions", hi: "कार्य", sa: "क्रियाः" },
  "status.pending": { en: "Pending", hi: "लंबित", sa: "प्रतीक्ष्यमाणम्" },
  "status.transit": { en: "In Transit", hi: "मार्ग में", sa: "मार्गे" },
  "status.sold": { en: "Sold", hi: "विक्रीत", sa: "विक्रीतम्" },
  "dash.action.markPending": { en: "Mark Pending", hi: "लंबित करें", sa: "प्रतीक्ष्यम् कृत्वा" },
  "dash.action.inTransit": { en: "In Transit", hi: "मार्ग में", sa: "मार्गे" },
  "dash.action.sold": { en: "Sold", hi: "विक्रीत", sa: "विक्रीतम्" },
  "dash.sales.total": { en: "Total income", hi: "कुल आय", sa: "समष्टि‑आयः" },
  "dash.sales.recent": { en: "Recent transactions", hi: "हाल के लेन‑देन", sa: "हालकाले व्यवहाराः" },
  "dash.sales.none": { en: "No sales yet.", hi: "अभी कोई बिक्री नहीं।", sa: "अद्यापि विक्रयः नास्ति।" },
  "dash.requests.title": { en: "Purchase requests", hi: "खरीद अनुरोध", sa: "क्रय‑आवेदनानि" },
  "dash.requests.approve": { en: "Approve", hi: "स्वीकृत करें", sa: "अंगीक्रियेत" },
  "dash.requests.deny": { en: "Deny", hi: "अस्वीकार करें", sa: "निरस्यतु" },
  "dash.help.tutorial": { en: "Tutorial", hi: "ट्यूटोरियल", sa: "पाठः" },
  "dash.help.openGuide": { en: "Open guide", hi: "गाइड खोलें", sa: "मार्गदर्शिका उद्घाट्यताम्" },
  "dash.help.helpline": { en: "Helpline", hi: "हेल्पलाइन", sa: "सहाय्य‑रेखा" },
  "dash.help.needHelp": { en: "Need help? Call our support team.", hi: "मदद चाहिए? हमारी सपोर्ट टीम को कॉल करें।", sa: "सहाय्यम् इच्छसि? समर्थन‑दलम् आवह।" },

  // learn
  "learn.title": { en: "Learn how VedaLink works", hi: "VedaLink कैसे काम करता है", sa: "VedaLink कथं कार्यं करोति" },
  "learn.sub": { en: "From farm to fork: a transparent, tamper‑evident journey. Explore each stage, see what data is captured, and how proofs keep it trustworthy.", hi: "फार्म से फोर्क तक: पारदर्शी, छेड़छाड़‑सुस्पष्ट यात्रा। हर चरण और उसके डेटा को देखें और जानें कि प्रमाण इसे विश्वसनीय कैसे रखते हैं।", sa: "क्षेत्रात् भोजनपर्यन्तं पारदर्शिनी अपरिवर्त्य‑यात्रा। प्रत्येक‑चरणे संगृहीतः दत्तांशः कथं विश्वसनीयः भवति इति विचिन्त्यताम्।" },
  "learn.try": { en: "Try the dashboard", hi: "डैशबोर्ड आज़माएँ", sa: "डैशबोर्ड परीक्षताम्" },
  "learn.viewFlow": { en: "View the flow", hi: "प्रवाह देखें", sa: "प्रवाहं पश्यतु" },
  "learn.flow.title": { en: "Traceability flow", hi: "ट्रेसबिलिटी प्रवाह", sa: "अनुगमन‑प्रवाहः" },
  "learn.flow.sub": { en: "Each step creates a signed event with time, place, and responsible party. Links form a verifiable chain.", hi: "हर चरण समय, स्थान और उत्तरदायी पक्ष सहित हस्���ाक्षरित इवेंट बनाता है। लिंक मिलकर सत्यापनीय शृंखला बनाते हैं।", sa: "प्रत्येकः चरणः काल‑देश‑उत्तरदायी‑सूचकैः सह हस्ताक्षरित‑घटनां निर्माति। सम्बन्धाः सत्यापनीयं श्रृंखलां कुर्वन्ति।" },
  "learn.topics": { en: "Key learning topics", hi: "मुख्य सीख विषय", sa: "प्रमुखाः अध्ययन‑विषयाः" },
  "learn.card.onchain": { en: "On‑chain proofs", hi: "ऑन‑चेन प्रमाण", sa: "श्रृंखलायां प्रमाणानि" },
  "learn.card.lifecycle": { en: "Batch lifecycle", hi: "बैच जीवन‑चक्र", sa: "समूह‑जीवनचक्रः" },
  "learn.card.scan": { en: "Scan experience", hi: "स्कैन अनुभव", sa: "स्कैन अनुभवं" },
  // learn deep-dive bullets
  "learn.card.onchain.p1": { en: "Events are signed with producer, coop, and processor keys", hi: "घटनाएँ उत्पादक, समिति ��र प्रोसेसर की कुंजियों से हस्ताक्षरित होती हैं", sa: "घटनाः उत्पादक‑समिति‑संस्कर्तृ‑कुञ्जिभिः हस्ताक्षरिताः" },
  "learn.card.onchain.p2": { en: "Content hashes anchor to a public ledger for integrity", hi: "कंटेंट हैश सार्वजनिक लेजर से जुड़ते हैं, अखंडता सुनिश्चित", sa: "विषय‑हैशाः सार्वजनिक‑निधाने निबद्धाः, अखण्डता‑रक्षा" },
  "learn.card.onchain.p3": { en: "Selective disclosure shares only necessary fields", hi: "चयनात्मक प्रकटीकरण से केवल आवश्यक फ़ील्ड साझा", sa: "विवेकानुसार प्रकटीकरणेन केवलम् आवश्यकाणि क्षेत्राणि साझ्यन्ते" },
  "learn.card.lifecycle.p1": { en: "Create batch with geotag, crop, and certificates", hi: "जियोटैग, फसल और प्रमाणपत्र सहित बैच बनाएँ", sa: "जि��ो‑चिह्न, कृषिः प्रमाणपत्रैः सह समूहम् निर्मातु" },
  "learn.card.lifecycle.p2": { en: "Record collection, processing, logistics handovers", hi: "संग्रह, प्रोसेसिंग और लॉजिस्टिक्स हस्तांतरण दर्ज करें", sa: "संग्रह‑संस्करण‑परिवहन‑हस्तान्तरणानि लेखयतु" },
  "learn.card.lifecycle.p3": { en: "Update status and ownership with time and actor", hi: "समय व उत्तरदायी पक्ष सहित स्थिति व स्वामित्व अपडेट", sa: "काल‑कर्तृ‑सूचकैः सह स्थिति‑स्वामित्वं अद्यतनीकरोतु" },
  "learn.card.scan.p1": { en: "Scan QR to view origin, journey, and proofs", hi: "उद्गम, यात्रा और प्रमाण देखने हेतु QR स्कैन करें", sa: "उद्गमं यात्रा च प्रमाणानि द्रष्टुं QR स्कैन कुरुत" },
  "learn.card.scan.p2": { en: "Works offline; syncs when connectivity returns", hi: "ऑफ़लाइन भी काम करता है; कनेक्टिविटी आने पर सिंक", sa: "अपसञ्चारे अपि कार्यं; संजालं लब्धे समन्वयः" },
  "learn.card.scan.p3": { en: "Privacy‑preserving labels for consumer trust", hi: "गोपनीयता‑सुरक्षित लेबल से उपभोक्ता भरोसा", sa: "गोपनीयता‑रक्षण‑लेबलैः उपभोक्ता‑विश्वासः वर्ध्यते" },

  // login
  "login.title": { en: "Welcome back", hi: "वापसी पर स्वागत है", sa: "पुनरागमनाय स्वागतं" },
  "login.sub": { en: "Sign in to access your dashboard.", hi: "अपना डैशबोर्ड उपयोग हेतु साइन‑इन करें।", sa: "डैशबोर्ड‑अधिकाराय प्रविशतु।" },
  "login.email": { en: "Email", hi: "ईमेल", sa: "ईमेल" },
  "login.password": { en: "Password", hi: "पासवर्ड", sa: "गुप्तशब्दः" },
  "login.error": { en: "Email and password are required", hi: "ईमेल व पासवर्ड आवश्यक हैं", sa: "ईमेल गुप्तशब्दः च आवश्यकौ" },
  "login.signing": { en: "Signing in…", hi: "साइन‑इन हो रहा…", sa: "प्रवेशः क्रियते…" },
  "login.submit": { en: "Sign in", hi: "साइन‑इन", sa: "प्रवेशः" },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
}

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (typeof window !== "undefined" && localStorage ? localStorage.getItem("lang") as Lang : "en"));
  useEffect(() => {
    // Needs to be shift to real database
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      // document is not defined on client side rendering
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = useMemo(() => {
    return (key: keyof typeof dict) => {
      const entry = dict[key];
      if (!entry) return String(key);
      return entry[lang] || entry.en;
    };
  }, [lang]);

  const value: Ctx = { lang, setLang, t };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
