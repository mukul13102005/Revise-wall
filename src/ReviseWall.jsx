import { useState, useMemo } from "react";
import { ShoppingCart, Search, X, Star, Instagram, Filter, Plus, Minus, ArrowRight, Check, Download, Zap, QrCode, Truck, BookOpen } from "lucide-react";

/* ── GLOBAL STYLES ─────────────────────────────────────────── */
const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .rw { font-family: 'Plus Jakarta Sans', sans-serif; background: #07070F; min-height: 100vh; color: #fff; }
    .dn { font-family: 'Syne', sans-serif !important; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: #0A0A14; }
    ::-webkit-scrollbar-thumb { background: #FF6500; border-radius: 4px; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes float1 { 0%,100% { transform:translateY(0) rotate(-4deg); } 50% { transform:translateY(-14px) rotate(-4deg); } }
    @keyframes float2 { 0%,100% { transform:translateY(0) rotate(3deg); } 50% { transform:translateY(-10px) rotate(3deg); } }
    @keyframes float3 { 0%,100% { transform:translateY(0) rotate(-1deg); } 50% { transform:translateY(-18px) rotate(-1deg); } }
    .fu { animation: fadeUp .5s ease both; }
    .fu1 { animation: fadeUp .5s .12s ease both; }
    .fu2 { animation: fadeUp .5s .24s ease both; }
    .fu3 { animation: fadeUp .5s .36s ease both; }
    .pc { transition: transform .25s ease, box-shadow .25s ease; cursor: pointer; }
    .pc:hover { transform: translateY(-6px); box-shadow: 0 24px 56px rgba(255,101,0,0.16) !important; }
    .tbp { background: #FF6500; color: #fff; border: none; cursor: pointer; font-family: inherit; font-weight: 700; transition: background .2s, transform .15s; }
    .tbp:hover:not(:disabled) { background: #FF8533; transform: translateY(-1px); }
    .tbo { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.18); cursor: pointer; font-family: inherit; transition: all .2s; }
    .tbo:hover { border-color: #FF6500; color: #FF6500; }
    .tb { background: linear-gradient(135deg,#FF6500,#FF9400); color:#fff; font-size:9px; font-weight:800; padding:2px 8px; border-radius:20px; letter-spacing:.3px; }
    .tn { background: linear-gradient(135deg,#7C3AED,#A855F7); color:#fff; font-size:9px; font-weight:800; padding:2px 8px; border-radius:20px; }
    input, select, textarea { font-family: 'Plus Jakarta Sans', sans-serif; }
    select option { background: #0F0F1A; }
  `}</style>
);

/* ── COLOR MAP ──────────────────────────────────────────────── */
const COL = {
  "CBSE Class 9":"#3B82F6","CBSE Class 10":"#6366F1","CBSE Class 11":"#8B5CF6","CBSE Class 12":"#A855F7",
  "JEE Preparation":"#EF4444","NEET Preparation":"#10B981","BTech CSE":"#06B6D4","BTech ECE":"#0EA5E9",
  "BTech Mechanical":"#F59E0B","BTech Civil":"#84CC16","BTech EEE":"#14B8A6","Diploma":"#64748B",
  "UPSC/Civil Services":"#D97706","SSC/Banking":"#DC2626","Railway/Defense":"#B45309",
  "Nursing/Paramedical":"#EC4899","Pharmacy":"#9333EA","MBA Entrance":"#0F766E",
  "Formula Megasheets":"#FF6500","Mind Map Series":"#7C3AED",
};

const FML = {
  "JEE Preparation":"F=ma · E=mc² · PV=nRT","NEET Preparation":"ATP→ADP+Pi · DNA→RNA",
  "CBSE Class 12":"∫f(x)dx · d/dx(eˣ)=eˣ","CBSE Class 11":"v=u+at · s=ut+½at²",
  "CBSE Class 10":"x=(-b±√b²-4ac)/2a","CBSE Class 9":"A=πr² · V=lwh",
  "BTech CSE":"O(n log n) · TCP/IP · SQL","BTech ECE":"V=IR · jω · H(jω)",
  "BTech Mechanical":"σ=F/A · τ=T/J · PV=mRT","BTech Civil":"M/I = σ/y = E/R",
  "BTech EEE":"P=VI · ∇·E=ρ/ε₀","Formula Megasheets":"∑ ∫ ∂ ∇ · All Formulas",
  "Mind Map Series":"Central → Branch → Leaf → Detail","UPSC/Civil Services":"Articles · Acts · History",
};

/* ── PRODUCT GENERATOR ──────────────────────────────────────── */
function generateProducts() {
  const P = []; let id = 1;
  const BASE = { A4:79, A3:129, A2:179, A1:249 };
  const TADJ = { "Complete Concept":20, "Formula Sheet":0, "Mind Map":15, "Quick Revision":-10, "Diagram Collection":20 };

  function add(cat, subj, type, size, tag=null) {
    const price = BASE[size] + (TADJ[type]||0);
    P.push({ id:id++, cat, subj, type, size, tag,
      title:`${subj} — ${type} Wall Poster`,
      price, orig: Math.round(price*1.38),
      rating: parseFloat((4.3+Math.random()*.6).toFixed(1)),
      reviews: Math.floor(15+Math.random()*650),
      sold: Math.floor(40+Math.random()*4500),
      color: COL[cat]||"#FF6500",
      fml: FML[cat]||"Important Concepts & Formulas",
      best: Math.random()>.72, isnew: Math.random()>.82,
    });
  }

  // CBSE 9
  ["Mathematics","Physics Basics","Chemistry Basics","Biology","History","Geography","English Grammar","Hindi Grammar"]
    .forEach(s=>["Complete Concept","Formula Sheet","Quick Revision","Mind Map"].forEach(t=>["A4","A3"].forEach(z=>add("CBSE Class 9",s,t,z))));

  // CBSE 10
  ["Mathematics","Physics","Chemistry","Biology","Social Science","English Lit & Grammar","Hindi","Computer Science"]
    .forEach(s=>["Complete Concept","Formula Sheet","Quick Revision","Mind Map","Diagram Collection"].forEach(t=>["A4","A3","A2"].forEach(z=>add("CBSE Class 10",s,t,z,s==="Mathematics"?"Board Special":null))));

  // CBSE 11
  ["Physics — Mechanics","Physics — Thermodynamics","Physics — Waves","Chemistry — Organic","Chemistry — Inorganic","Chemistry — Physical","Maths — Calculus","Maths — Algebra","Biology — Botany","Biology — Zoology","Computer Science — Python"]
    .forEach(s=>["Complete Concept","Formula Sheet","Quick Revision","Mind Map","Diagram Collection"].forEach(t=>["A3","A2"].forEach(z=>add("CBSE Class 11",s,t,z))));

  // CBSE 12
  ["Physics — Electrostatics","Physics — Optics","Physics — Modern Physics","Chemistry — Organic Reactions","Chemistry — Inorganic p-Block","Chemistry — Electrochemistry","Maths — Integration","Maths — Vectors & 3D","Maths — Probability","Biology — Genetics","Biology — Ecology","Biology — Reproduction","Computer Science — Python","Computer Science — Data Structures","Accountancy","Business Studies","Economics"]
    .forEach(s=>["Complete Concept","Formula Sheet","Quick Revision","Mind Map","Diagram Collection"].forEach(t=>["A3","A2","A1"].forEach(z=>add("CBSE Class 12",s,t,z,"Board 2025"))));

  // JEE
  ["Kinematics","Laws of Motion","Work Energy Power","Rotational Motion","Gravitation","Fluid Mechanics","Thermal Physics","SHM & Waves","Electrostatics","Current Electricity","Magnetic Effects","EMI & AC","Ray Optics","Wave Optics","Modern Physics"].forEach(s=>
    ["Complete Concept","Formula Sheet","Mind Map"].forEach(t=>["A3","A2"].forEach(z=>add("JEE Preparation",`Physics — ${s}`,t,z,"JEE 2025"))));
  ["Mole Concept","Chemical Bonding","Thermodynamics","Chemical Equilibrium","Electrochemistry","Organic Basics","Hydrocarbons","Alcohols & Ethers","Aldehydes & Ketones","Carboxylic Acids","Amines","Polymers","Coordination Chemistry","p-Block Elements","d & f Block"].forEach(s=>
    ["Complete Concept","Formula Sheet","Mind Map"].forEach(t=>["A3","A2"].forEach(z=>add("JEE Preparation",`Chemistry — ${s}`,t,z,"JEE 2025"))));
  ["Complex Numbers","Quadratic Equations","Sequences & Series","P&C","Binomial Theorem","Trigonometry","Straight Lines","Circles","Conic Sections","Limits","Derivatives","Integration","Differential Equations","Vectors & 3D","Probability"].forEach(s=>
    ["Complete Concept","Formula Sheet","Mind Map"].forEach(t=>["A3","A2"].forEach(z=>add("JEE Preparation",`Maths — ${s}`,t,z,"JEE 2025"))));

  // NEET
  ["Physics — Mechanics","Physics — Thermodynamics","Physics — Optics","Physics — Modern Physics","Chemistry — Organic","Chemistry — Inorganic","Chemistry — Physical","Bio — Cell Structure","Bio — Biomolecules","Bio — Cell Division","Bio — Photosynthesis","Bio — Respiration","Bio — Human Digestion","Bio — Circulation","Bio — Human Respiration","Bio — Excretory System","Bio — Nervous System","Bio — Endocrine System","Bio — Reproduction","Bio — Genetics","Bio — Ecosystem","Bio — Biotechnology"]
    .forEach(s=>["Complete Concept","Quick Revision","Diagram Collection"].forEach(t=>["A3","A2"].forEach(z=>add("NEET Preparation",s,t,z,"NEET 2025"))));

  // BTech CSE
  const cse={ "Sem 1":["Engg Maths I","Basic Electronics","Programming in C"],"Sem 2":["Engg Maths II","Data Structures","Digital Logic"],"Sem 3":["Discrete Mathematics","OOP with Java","Computer Organization"],"Sem 4":["Theory of Computation","DBMS","Operating Systems"],"Sem 5":["Computer Networks","Software Engineering","Compiler Design"],"Sem 6":["Artificial Intelligence","Web Technologies","Machine Learning"],"Sem 7":["Cloud Computing","Cyber Security","Big Data Analytics"],"Sem 8":["Deep Learning","Computer Vision","IoT & Embedded"] };
  Object.entries(cse).forEach(([sem,subs])=>subs.forEach(s=>["Complete Concept","Formula Sheet","Mind Map"].forEach(t=>["A3","A2"].forEach(z=>add("BTech CSE",`${sem} — ${s}`,t,z)))));

  // BTech ECE
  ["Electronic Devices","Signals & Systems","Analog Circuits","Digital Communication","Microprocessors","VLSI Design","Control Systems","Antenna Theory","RF Engineering","Embedded Systems","DSP","Communication Engg"]
    .forEach(s=>["Complete Concept","Formula Sheet","Diagram Collection"].forEach(t=>["A3","A2"].forEach(z=>add("BTech ECE",s,t,z))));

  // BTech Mechanical
  ["Engg Mechanics","Thermodynamics","Fluid Mechanics","Heat Transfer","Manufacturing Processes","Machine Design","Theory of Machines","Strength of Materials","CAD/CAM","Industrial Engg","Refrigeration & AC","Turbomachinery"]
    .forEach(s=>["Complete Concept","Diagram Collection","Quick Revision"].forEach(t=>["A3","A2"].forEach(z=>add("BTech Mechanical",s,t,z))));

  // BTech Civil
  ["Structural Analysis","RCC Design","Soil Mechanics","Fluid Mechanics","Surveying","Environmental Engg","Transportation Engg","Construction Management","Estimation & Costing"]
    .forEach(s=>["Complete Concept","Diagram Collection"].forEach(t=>["A3","A2"].forEach(z=>add("BTech Civil",s,t,z))));

  // BTech EEE
  ["Circuit Theory","Electrical Machines","Power Systems","Control Systems","Power Electronics","Measurements & Instrumentation","Switchgear & Protection","High Voltage Engg"]
    .forEach(s=>["Complete Concept","Formula Sheet"].forEach(t=>["A3","A2"].forEach(z=>add("BTech EEE",s,t,z))));

  // Diploma
  ["CSE — Programming C","CSE — Web Design","CSE — Database","CSE — Data Structures","ECE — Electronic Circuits","ECE — Communication","Mechanical — Workshop","Mechanical — Thermodynamics","Civil — Building Materials","Civil — Surveying","EEE — Electrical Basics","Pharma — Drug Chemistry"]
    .forEach(s=>["Complete Concept","Quick Revision"].forEach(t=>["A4","A3"].forEach(z=>add("Diploma",s,t,z))));

  // UPSC
  ["History — Ancient & Medieval","History — Modern India","Geography — Physical","Geography — Human & Economic","Indian Polity & Constitution","Indian Economy","Science & Technology","Environment & Ecology","Art & Culture","International Relations","Disaster Management","Internal Security"]
    .forEach(s=>["Complete Concept","Mind Map","Quick Revision"].forEach(t=>["A3","A2"].forEach(z=>add("UPSC/Civil Services",s,t,z,"UPSC 2025"))));

  // SSC/Banking
  ["QA — Number System","QA — Algebra & Geometry","English Grammar Complete","English Vocabulary","Logical Reasoning — Verbal","Reasoning — Non-Verbal","General Awareness — Banking","Computer Fundamentals"]
    .forEach(s=>["Complete Concept","Quick Revision"].forEach(t=>["A4","A3"].forEach(z=>add("SSC/Banking",s,t,z))));

  // Railway/Defense
  ["General Science Physics","General Science Chemistry","Maths Basics","Logical Reasoning","GK India"]
    .forEach(s=>["Complete Concept","Quick Revision"].forEach(t=>["A4","A3"].forEach(z=>add("Railway/Defense",s,t,z))));

  // Nursing
  ["Anatomy — Skeletal & Muscular","Anatomy — Organ Systems","Physiology","Biochemistry Basics","Pharmacology","Microbiology","Pathology","Community Health Nursing","Medical-Surgical Nursing","Obstetrics & Gynecology"]
    .forEach(s=>["Complete Concept","Diagram Collection"].forEach(t=>["A3","A2"].forEach(z=>add("Nursing/Paramedical",s,t,z))));

  // Pharmacy
  ["Pharmaceutical Chemistry","Pharmacognosy","Human Anatomy & Physiology","Biochemistry","Pharmacology I","Pharmaceutical Analysis","Hospital Pharmacy","Drug Regulatory Affairs"]
    .forEach(s=>["Complete Concept","Formula Sheet"].forEach(t=>["A3","A2"].forEach(z=>add("Pharmacy",s,t,z))));

  // MBA
  ["QA — CAT Arithmetic","QA — CAT Algebra","Data Interpretation","Verbal Ability","Logical Reasoning — CAT"]
    .forEach(s=>["Complete Concept","Quick Revision","Mind Map"].forEach(t=>["A4","A3"].forEach(z=>add("MBA Entrance",s,t,z,"CAT 2025"))));

  // Formula Megasheets
  ["Physics — All Formulas Cl 11-12","Chemistry — All Reactions","Maths — Complete Formula Atlas","Maths — Trigonometry Complete","Physics — Constants & Units","Periodic Table Trends","Maths — Integration Sheet","Maths — Differentiation Sheet","Physics — Electricity & Magnetism","Biology — All Diagrams"]
    .forEach(s=>["A2","A1"].forEach(z=>add("Formula Megasheets",s,"Formula Sheet",z,"MEGA")));

  // Mind Map Series
  ["JEE Physics — Complete Atlas","NEET Biology — All Systems","UPSC Polity — Constitution Flow","Class 10 Science — Chapter Maps","Class 12 Chemistry Reactions Web","Class 12 Maths Concepts Map","Class 11 Physics — Concept Links","NEET Chemistry Organic Web"]
    .forEach(s=>["A2","A1"].forEach(z=>add("Mind Map Series",s,"Mind Map",z,"NEW")));

  return P;
}

/* ── POSTER MOCKUP ──────────────────────────────────────────── */
const QR_PAT = [1,0,1,0,0,1,0,1,1,1,0,0,0,0,1,1];
function PosterMockup({ p, compact=false }) {
  const c=p.color, pad=compact?10:16;
  const lines=[100,72,88,55,78,60,90,50].slice(0,compact?5:8);
  return (
    <div style={{ background:`linear-gradient(145deg,${c}25 0%,${c}0d 60%,#050510 100%)`, border:`1px solid ${c}3a`, borderRadius:compact?8:14, padding:pad, width:"100%", aspectRatio:"3/4", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
        <span style={{ fontSize:7, background:c, color:"#fff", padding:"2px 6px", borderRadius:3, fontWeight:800, letterSpacing:.8, fontFamily:"Syne,sans-serif" }}>REVISEWALL</span>
        <span style={{ fontSize:7, color:`${c}cc`, fontWeight:700 }}>{p.size}</span>
      </div>
      <div style={{ fontSize:compact?9:12, fontWeight:800, color:"#fff", lineHeight:1.2, marginBottom:8, fontFamily:"Syne,sans-serif" }}>
        {p.subj.length>20?p.subj.slice(0,20)+"…":p.subj}
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:3 }}>
        {lines.map((w,i)=>(
          <div key={i} style={{ height:i===0?4:3, background:i===0?`${c}99`:i%2===0?`${c}55`:`${c}28`, borderRadius:2, width:`${w}%` }} />
        ))}
        <div style={{ background:`${c}15`, border:`1px solid ${c}28`, borderRadius:5, padding:"5px 7px", marginTop:"auto", fontSize:7, color:`${c}cc`, fontFamily:"monospace", lineHeight:1.5 }}>
          {(p.fml||"F=ma·E=mc²").slice(0,28)}
        </div>
      </div>
      <div style={{ position:"absolute", bottom:7, right:7, width:18, height:18, background:"white", borderRadius:2, display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", padding:"2px" }}>
        {QR_PAT.map((v,i)=>(<div key={i} style={{ background:v?"#000":"transparent", borderRadius:1 }} />))}
      </div>
      <div style={{ position:"absolute", bottom:9, left:8, fontSize:6, color:`${c}77`, fontWeight:700, textTransform:"uppercase", letterSpacing:.5 }}>
        {p.type.slice(0,9)}
      </div>
    </div>
  );
}

/* ── PRODUCT CARD ───────────────────────────────────────────── */
function ProductCard({ p, onAdd }) {
  const disc = Math.round((1-p.price/p.orig)*100);
  return (
    <div className="pc" style={{ background:"#0F0F1A", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, overflow:"hidden", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"12px 12px 0" }}><PosterMockup p={p} compact /></div>
      <div style={{ padding:"10px 12px 14px", display:"flex", flexDirection:"column", gap:5, flex:1 }}>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap", minHeight:18 }}>
          {p.best && <span className="tb">🔥 Bestseller</span>}
          {p.isnew && <span className="tn">✨ New</span>}
          {p.tag && <span style={{ background:"rgba(255,101,0,0.13)", color:"#FF9400", fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:20 }}>{p.tag}</span>}
        </div>
        <div style={{ fontSize:12, fontWeight:600, color:"#E5E7EB", lineHeight:1.35 }}>
          {p.title.length>44?p.title.slice(0,44)+"…":p.title}
        </div>
        <div style={{ fontSize:10, color:`${p.color}bb` }}>{p.cat}</div>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ display:"flex", gap:1 }}>
            {[1,2,3,4,5].map(s=><Star key={s} size={10} fill={s<=Math.round(p.rating)?"#FFB800":"none"} color={s<=Math.round(p.rating)?"#FFB800":"#374151"} />)}
          </div>
          <span style={{ fontSize:10, color:"#6B7280" }}>{p.rating} ({p.reviews})</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"auto", paddingTop:4 }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
            <span style={{ fontSize:18, fontWeight:800, color:"#fff" }}>₹{p.price}</span>
            <span style={{ fontSize:11, color:"#4B5563", textDecoration:"line-through" }}>₹{p.orig}</span>
            <span style={{ fontSize:10, color:"#10B981", fontWeight:700 }}>{disc}% off</span>
          </div>
        </div>
        <button className="tbp" onClick={()=>onAdd(p)} style={{ width:"100%", padding:"9px", borderRadius:10, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
          <ShoppingCart size={12} /> Add to Cart
        </button>
        <div style={{ display:"flex", gap:8 }}>
          {[["📄","PDF"],["📦","Print"],["🎥","QR"]].map(([ic,lb])=>(
            <span key={lb} style={{ fontSize:9, color:"#4B5563", display:"flex", alignItems:"center", gap:2 }}>{ic}{lb}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── NAVBAR ─────────────────────────────────────────────────── */
function Navbar({ cartCount, onCartOpen, page, setPage, search, setSearch }) {
  return (
    <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(7,7,15,0.94)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"0 32px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
      <div onClick={()=>setPage("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
        <div style={{ width:34, height:34, background:"linear-gradient(135deg,#FF6500,#FF9A00)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>📌</div>
        <span className="dn" style={{ fontSize:21, fontWeight:800, color:"#fff" }}>Revise<span style={{ color:"#FF6500" }}>Wall</span></span>
      </div>
      <div style={{ position:"relative", flex:1, maxWidth:320 }}>
        <Search size={13} color="#4B5563" style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)" }} />
        <input value={search} onChange={e=>{setSearch(e.target.value);if(e.target.value)setPage("shop");}} placeholder="Search posters, subjects, exams…" style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:9, padding:"8px 12px 8px 30px", color:"#fff", fontSize:13, width:"100%", outline:"none" }} />
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:16, flexShrink:0 }}>
        {[["home","Home"],["shop","Shop All"]].map(([pg,lb])=>(
          <span key={pg} onClick={()=>setPage(pg)} style={{ fontSize:13, color:page===pg?"#FF6500":"#9CA3AF", cursor:"pointer", fontWeight:page===pg?700:400, transition:"color .2s" }}>{lb}</span>
        ))}
        <a href="https://instagram.com/unethicalmk" target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:5, background:"linear-gradient(135deg,#833AB4,#FD1D1D,#F77737)", padding:"6px 12px", borderRadius:8, color:"white", textDecoration:"none", fontSize:12, fontWeight:700 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
          @unethicalmk
        </a>
        <button onClick={onCartOpen} className="tbo" style={{ borderRadius:9, padding:"7px 14px", display:"flex", alignItems:"center", gap:7, position:"relative" }}>
          <ShoppingCart size={16} />
          {cartCount>0&&<span style={{ position:"absolute", top:-6, right:-6, background:"#FF6500", color:"white", borderRadius:"50%", width:18, height:18, fontSize:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800 }}>{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}

/* ── CART DRAWER ────────────────────────────────────────────── */
function CartDrawer({ cart, onClose, onQty, onRemove, onCheckout }) {
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const saved = cart.reduce((s,i)=>s+(i.orig-i.price)*i.qty,0);
  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.72)", zIndex:199 }} />
      <div style={{ position:"fixed", top:0, right:0, bottom:0, width:380, background:"#0F0F1A", borderLeft:"1px solid rgba(255,255,255,0.07)", zIndex:200, display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"20px 24px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div className="dn" style={{ fontSize:20, fontWeight:800, color:"#fff" }}>Your Cart</div>
            <div style={{ fontSize:12, color:"#6B7280" }}>{cart.length} item{cart.length!==1?"s":""}</div>
          </div>
          <button onClick={onClose} className="tbo" style={{ padding:8, borderRadius:8 }}><X size={16}/></button>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"16px 24px" }}>
          {cart.length===0?(
            <div style={{ textAlign:"center", padding:"60px 0", color:"#4B5563" }}>
              <ShoppingCart size={52} color="#1F2937" style={{ margin:"0 auto 12px" }} />
              <div style={{ fontSize:16, fontWeight:700 }}>Cart is empty</div>
              <div style={{ fontSize:13, marginTop:4, color:"#6B7280" }}>Find posters for your exams!</div>
            </div>
          ):cart.map(item=>(
            <div key={item.id} style={{ display:"flex", gap:12, padding:"14px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ width:56, flexShrink:0 }}><PosterMockup p={item} compact /></div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:"#E5E7EB", lineHeight:1.3, marginBottom:3 }}>
                  {item.title.length>38?item.title.slice(0,38)+"…":item.title}
                </div>
                <div style={{ fontSize:10, color:"#6B7280", marginBottom:8 }}>{item.size} • PDF + Physical Print</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <button onClick={()=>onQty(item.id,-1)} style={{ background:"rgba(255,255,255,0.08)", border:"none", borderRadius:6, width:26, height:26, cursor:"pointer", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"inherit" }}><Minus size={11}/></button>
                    <span style={{ fontSize:14, fontWeight:800, color:"#fff", minWidth:18, textAlign:"center" }}>{item.qty}</span>
                    <button onClick={()=>onQty(item.id,1)} style={{ background:"rgba(255,255,255,0.08)", border:"none", borderRadius:6, width:26, height:26, cursor:"pointer", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"inherit" }}><Plus size={11}/></button>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:15, fontWeight:800, color:"#fff" }}>₹{item.price*item.qty}</span>
                    <button onClick={()=>onRemove(item.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#EF4444", fontSize:11, fontFamily:"inherit" }}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length>0&&(
          <div style={{ padding:"20px 24px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ fontSize:13, color:"#9CA3AF" }}>You're saving</span>
              <span style={{ fontSize:13, color:"#10B981", fontWeight:700 }}>₹{saved}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
              <span style={{ fontSize:16, fontWeight:700, color:"#fff" }}>Total</span>
              <span className="dn" style={{ fontSize:24, fontWeight:800, color:"#FF6500" }}>₹{total}</span>
            </div>
            <button onClick={onCheckout} className="tbp" style={{ width:"100%", padding:"13px", borderRadius:12, fontSize:15, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              Checkout <ArrowRight size={18}/>
            </button>
            <div style={{ display:"flex", gap:12, marginTop:10, justifyContent:"center" }}>
              {["🔒 Secure Pay","📦 Free Ship ₹499+","📄 PDF Instant"].map(t=>(
                <span key={t} style={{ fontSize:9, color:"#4B5563" }}>{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ── CHECKOUT MODAL ─────────────────────────────────────────── */
function CheckoutModal({ cart, onClose, onSuccess }) {
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", email:"", pincode:"", address:"", format:"both", payment:"upi" });
  const inp = { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:9, padding:"11px 14px", color:"#fff", fontSize:14, width:"100%", outline:"none" };
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const handlePay = () => { setProcessing(true); setTimeout(()=>{ setProcessing(false); setStep(3); onSuccess(); },2000); };
  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.82)", zIndex:299 }} />
      <div style={{ position:"fixed", inset:0, display:"flex", alignItems:"center", justifyContent:"center", zIndex:300, padding:16 }}>
        <div style={{ background:"#0F0F1A", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, width:"100%", maxWidth:480, maxHeight:"92vh", overflowY:"auto", padding:"32px", position:"relative" }}>
          <button onClick={onClose} style={{ position:"absolute", top:20, right:20, background:"none", border:"none", cursor:"pointer", color:"#6B7280" }}><X size={20}/></button>
          {step===3?(
            <div style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ width:72, height:72, background:"rgba(16,185,129,0.12)", border:"2px solid #10B981", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
                <Check size={36} color="#10B981"/>
              </div>
              <div className="dn" style={{ fontSize:30, fontWeight:800, color:"#fff", marginBottom:8 }}>Order Placed! 🎉</div>
              <div style={{ fontSize:14, color:"#9CA3AF", lineHeight:1.7 }}>
                PDF will arrive in your email within <strong style={{ color:"#10B981" }}>30 minutes</strong>.<br/>
                Physical poster: 3–7 business days delivery.
              </div>
              <div style={{ background:"rgba(255,101,0,0.08)", border:"1px solid rgba(255,101,0,0.18)", borderRadius:12, padding:16, marginTop:20, fontSize:13, color:"#FF9400", lineHeight:1.7 }}>
                📌 Paste on your study wall and let the magic begin!<br/>
                🎥 Scan QR codes for video explanations
              </div>
              <button onClick={onClose} className="tbp" style={{ marginTop:24, padding:"12px 36px", borderRadius:10, fontSize:15 }}>Continue Shopping</button>
            </div>
          ):step===1?(
            <>
              <div className="dn" style={{ fontSize:24, fontWeight:800, color:"#fff", marginBottom:4 }}>Delivery Details</div>
              <div style={{ fontSize:13, color:"#6B7280", marginBottom:22 }}>Order total: <strong style={{ color:"#FF6500", fontSize:20 }}>₹{total}</strong></div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[["name","Full Name","text"],["phone","Phone Number","tel"],["email","Email (PDF will be sent here)","email"],["pincode","Pincode","text"],["address","Full Delivery Address","text"]].map(([k,pl,t])=>(
                  <input key={k} type={t} placeholder={pl} value={form[k]} onChange={e=>set(k,e.target.value)} style={inp} />
                ))}
                <div>
                  <div style={{ fontSize:12, color:"#9CA3AF", marginBottom:8 }}>Select Format</div>
                  <div style={{ display:"flex", gap:8 }}>
                    {[["pdf","📄 PDF Only"],["print","📦 Print Only"],["both","🎯 PDF + Print"]].map(([v,l])=>(
                      <button key={v} onClick={()=>set("format",v)} style={{ flex:1, padding:"9px 4px", borderRadius:9, fontSize:10, fontWeight:700, background:form.format===v?"rgba(255,101,0,0.18)":"rgba(255,255,255,0.04)", border:`1px solid ${form.format===v?"#FF6500":"rgba(255,255,255,0.09)"}`, color:form.format===v?"#FF6500":"#9CA3AF", cursor:"pointer", fontFamily:"inherit" }}>{l}</button>
                    ))}
                  </div>
                </div>
                <button onClick={()=>setStep(2)} className="tbp" style={{ padding:"13px", borderRadius:11, fontSize:15, marginTop:4 }}>
                  Continue to Payment →
                </button>
              </div>
            </>
          ):(
            <>
              <div className="dn" style={{ fontSize:24, fontWeight:800, color:"#fff", marginBottom:4 }}>Payment</div>
              <div style={{ fontSize:13, color:"#6B7280", marginBottom:22 }}>Amount: <strong style={{ color:"#FF6500", fontSize:20 }}>₹{total}</strong></div>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
                {[["upi","📱 UPI — Instant & Recommended"],["card","💳 Debit / Credit Card"],["netbanking","🏦 Net Banking"],["cod","🚚 Cash on Delivery (+₹40)"]].map(([v,l])=>(
                  <button key={v} onClick={()=>set("payment",v)} style={{ padding:"13px 16px", borderRadius:10, fontSize:13, fontWeight:600, background:form.payment===v?"rgba(255,101,0,0.15)":"rgba(255,255,255,0.04)", border:`1px solid ${form.payment===v?"#FF6500":"rgba(255,255,255,0.08)"}`, color:form.payment===v?"#FF6500":"#9CA3AF", cursor:"pointer", fontFamily:"inherit", textAlign:"left", display:"flex", alignItems:"center", gap:8 }}>
                    {form.payment===v&&<Check size={13} color="#FF6500"/>}{l}
                  </button>
                ))}
              </div>
              <button onClick={handlePay} disabled={processing} className="tbp" style={{ width:"100%", padding:"14px", borderRadius:12, fontSize:15, opacity:processing?.8:1 }}>
                {processing?"⏳ Processing secure payment…":`Pay ₹${total} Securely 🔒`}
              </button>
              <div style={{ display:"flex", gap:12, marginTop:12, justifyContent:"center" }}>
                {["🔒 256-bit SSL","🏦 RBI Compliant","✓ 50,000+ Orders"].map(t=>(
                  <span key={t} style={{ fontSize:9, color:"#4B5563" }}>{t}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* ── HOME PAGE ──────────────────────────────────────────────── */
const CATS = [
  { name:"CBSE Class 9", ic:"📗", c:"#3B82F6" },{ name:"CBSE Class 10", ic:"🎯", c:"#6366F1" },
  { name:"CBSE Class 11", ic:"📘", c:"#8B5CF6" },{ name:"CBSE Class 12", ic:"🏆", c:"#A855F7" },
  { name:"JEE Preparation", ic:"⚡", c:"#EF4444" },{ name:"NEET Preparation", ic:"🔬", c:"#10B981" },
  { name:"BTech CSE", ic:"💻", c:"#06B6D4" },{ name:"BTech ECE", ic:"📡", c:"#0EA5E9" },
  { name:"BTech Mechanical", ic:"⚙️", c:"#F59E0B" },{ name:"BTech Civil", ic:"🏗️", c:"#84CC16" },
  { name:"BTech EEE", ic:"⚡", c:"#14B8A6" },{ name:"Diploma", ic:"📋", c:"#64748B" },
  { name:"UPSC/Civil Services", ic:"🇮🇳", c:"#D97706" },{ name:"SSC/Banking", ic:"🏦", c:"#DC2626" },
  { name:"Railway/Defense", ic:"🚂", c:"#B45309" },{ name:"Nursing/Paramedical", ic:"🏥", c:"#EC4899" },
  { name:"Pharmacy", ic:"💊", c:"#9333EA" },{ name:"MBA Entrance", ic:"📊", c:"#0F766E" },
  { name:"Formula Megasheets", ic:"📐", c:"#FF6500" },{ name:"Mind Map Series", ic:"🧠", c:"#7C3AED" },
];

function HomePage({ products, onAdd, goShop }) {
  const hero = products.filter(p=>p.best).slice(0,3);
  const featured = useMemo(()=>{
    const out=[];
    CATS.forEach(c=>{ const cp=products.filter(p=>p.cat===c.name); if(cp.length>0)out.push(cp[0]); });
    return out.slice(0,16);
  },[products]);
  const STATS=[{n:"50,000+",l:"Happy Students",ic:"👨‍🎓"},{n:"1,500+",l:"Poster Designs",ic:"📌"},{n:"4.9★",l:"Average Rating",ic:"⭐"},{n:"20+",l:"Categories",ic:"📚"}];
  const WHY=[["👁️","Visual Memory","Students retain 65% more from visuals. Paste the poster, your brain absorbs it 100 times a day."],["📌","Always Visible","See it 100+ times daily without effort. Long-term memory in just 2-3 months — guaranteed."],["🎥","QR Video Links","Every poster has QR codes linking to full video explanations. Learn visually + digitally."],["📄","PDF + Physical","Instant PDF on email AND premium print delivered to your doorstep."],["✅","Expert-Designed","Content by IITians & top teachers. Every concept that matters, nothing that doesn't."],["💰","Starts at ₹79","Affordable for every Indian student. Cheaper than a textbook, more useful than a YouTube rabbit hole."]];
  const REVS=[["Arjun S.","JEE 2024 AIR 892","Physics formula posters changed everything. Concepts just stuck without studying. Mindblown!","#EF4444"],["Priya M.","NEET 2024 Qualifier","Biology diagram posters are insane quality. My whole room became a study den. 10/10!","#10B981"],["Rahul K.","BTech CSE, VIT","Computer Networks poster 3 days before exam — still got an A. This thing is magic.","#06B6D4"],["Sneha P.","Class 12 — 94% CBSE","Maths formula poster on my wall = never need to open textbook for revision. Absolute gold!","#A855F7"],["Amit T.","UPSC Aspirant","Indian Polity mind map is the best thing I've bought for my prep. So dense, so clear.","#D97706"],["Kavya R.","Class 10 — 97% CBSE","Science diagrams helped me score full marks in MCQs. Mom bought 6 more for my room!","#6366F1"]];
  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight:"88vh", display:"flex", alignItems:"center", padding:"60px 48px", background:"radial-gradient(ellipse at 25% 60%, rgba(255,101,0,0.07) 0%, transparent 55%)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"15%", right:"8%", width:300, height:300, background:"radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", display:"flex", alignItems:"center", gap:80 }}>
          <div style={{ flex:1 }}>
            <div className="fu" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,101,0,0.11)", border:"1px solid rgba(255,101,0,0.22)", borderRadius:20, padding:"6px 14px", marginBottom:24 }}>
              <Zap size={12} color="#FF6500"/><span style={{ fontSize:12, color:"#FF6500", fontWeight:700 }}>India's #1 Study Wall Poster Brand</span>
            </div>
            <h1 className="dn fu1" style={{ fontSize:"clamp(44px,5.5vw,76px)", fontWeight:800, color:"#fff", lineHeight:1.0, marginBottom:20 }}>
              Paste It.<br/><span style={{ color:"#FF6500" }}>See It.</span><br/>Know It.
            </h1>
            <p className="fu2" style={{ fontSize:16, color:"#9CA3AF", lineHeight:1.75, marginBottom:32, maxWidth:480 }}>
              Visual study posters for every Indian student. Class 9 to BTech. JEE to UPSC.{" "}
              <strong style={{ color:"#fff" }}>Paste once. Your wall teaches you forever.</strong>
            </p>
            <div className="fu3" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button onClick={()=>goShop()} className="tbp" style={{ padding:"14px 28px", borderRadius:12, fontSize:15, display:"flex", alignItems:"center", gap:8 }}>
                Browse Posters <ArrowRight size={18}/>
              </button>
              <button className="tbo" style={{ padding:"14px 28px", borderRadius:12, fontSize:15, display:"flex", alignItems:"center", gap:8 }}>
                <Download size={16}/> Get App (Soon)
              </button>
            </div>
            <div style={{ display:"flex", gap:20, marginTop:28, flexWrap:"wrap" }}>
              {["📄 PDF Included","🎥 QR Video Links","📦 Free Shipping ₹499+","⚡ Instant PDF Download"].map(t=>(
                <span key={t} style={{ fontSize:11, color:"#6B7280" }}>{t}</span>
              ))}
            </div>
          </div>
          {/* Floating poster mockups */}
          <div style={{ flex:.9, display:"flex", gap:14, justifyContent:"center", alignItems:"center", flexShrink:0 }}>
            {hero.map((p,i)=>(
              <div key={p.id} style={{ width:130, animation:`float${i+1} ${3.2+i*.6}s ease-in-out infinite`, animationDelay:`${i*.8}s` }}>
                <PosterMockup p={p}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background:"#0A0A14", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"28px 48px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:24 }}>
          {STATS.map(s=>(
            <div key={s.l} style={{ textAlign:"center" }}>
              <div style={{ fontSize:10, marginBottom:2 }}>{s.ic}</div>
              <div className="dn" style={{ fontSize:30, fontWeight:800, color:"#FF6500" }}>{s.n}</div>
              <div style={{ fontSize:12, color:"#6B7280" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding:"64px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <h2 className="dn" style={{ fontSize:"clamp(28px,3vw,42px)", fontWeight:800, color:"#fff", marginBottom:6 }}>All Categories</h2>
            <p style={{ fontSize:15, color:"#6B7280" }}>Every student. Every exam. Every subject.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:10 }}>
            {CATS.map(cat=>{
              const count=products.filter(p=>p.cat===cat.name).length;
              return (
                <div key={cat.name} className="pc" onClick={()=>goShop(cat.name)} style={{ background:"#0F0F1A", border:`1px solid ${cat.c}20`, borderRadius:12, padding:"16px 10px", textAlign:"center", cursor:"pointer" }}>
                  <div style={{ fontSize:26, marginBottom:5 }}>{cat.ic}</div>
                  <div style={{ fontSize:11, fontWeight:700, color:"#E5E7EB", lineHeight:1.3, marginBottom:3 }}>{cat.name}</div>
                  <div style={{ fontSize:10, color:cat.c }}>{count} posters</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ padding:"64px 48px", background:"#080810" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32, flexWrap:"wrap", gap:12 }}>
            <div>
              <h2 className="dn" style={{ fontSize:32, fontWeight:800, color:"#fff", marginBottom:4 }}>Featured Posters</h2>
              <p style={{ fontSize:13, color:"#6B7280" }}>Bestsellers across all categories</p>
            </div>
            <button onClick={()=>goShop()} className="tbo" style={{ padding:"9px 20px", borderRadius:10, fontSize:13, display:"flex", alignItems:"center", gap:6 }}>View All 1,500+ <ArrowRight size={13}/></button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14 }}>
            {featured.map(p=><ProductCard key={p.id} p={p} onAdd={onAdd}/>)}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section style={{ padding:"64px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <h2 className="dn" style={{ fontSize:32, fontWeight:800, color:"#fff", textAlign:"center", marginBottom:44 }}>
            Why <span style={{ color:"#FF6500" }}>ReviseWall</span> Works
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
            {WHY.map(([ic,t,d])=>(
              <div key={t} style={{ background:"#0F0F1A", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:24 }}>
                <div style={{ fontSize:30, marginBottom:12 }}>{ic}</div>
                <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:8 }}>{t}</div>
                <div style={{ fontSize:13, color:"#6B7280", lineHeight:1.65 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding:"64px 48px", background:"#080810" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <h2 className="dn" style={{ fontSize:32, fontWeight:800, color:"#fff", textAlign:"center", marginBottom:40 }}>
            Students Love It ❤️
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
            {REVS.map(([n,r,rv,c])=>(
              <div key={n} style={{ background:"#0F0F1A", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:20 }}>
                <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:`${c}28`, border:`2px solid ${c}55`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:c, fontFamily:"Syne,sans-serif" }}>{n[0]}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{n}</div>
                    <div style={{ fontSize:11, color:c }}>{r}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:2, marginBottom:8 }}>
                  {[1,2,3,4,5].map(s=><Star key={s} size={11} fill="#FFB800" color="#FFB800"/>)}
                </div>
                <p style={{ fontSize:13, color:"#9CA3AF", lineHeight:1.65 }}>"{rv}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP CTA */}
      <section style={{ padding:"64px 48px", background:"linear-gradient(135deg,rgba(255,101,0,0.1),rgba(124,58,237,0.07))" }}>
        <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:52, marginBottom:16 }}>📱</div>
          <h2 className="dn" style={{ fontSize:32, fontWeight:800, color:"#fff", marginBottom:12 }}>
            ReviseWall App<br/><span style={{ color:"#FF6500" }}>Coming Soon on Play Store</span>
          </h2>
          <p style={{ fontSize:14, color:"#6B7280", lineHeight:1.75, marginBottom:24 }}>
            Browse, buy & access all PDF posters instantly. QR scanner built-in. AI revision reminders. Offline mode included.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button className="tbp" style={{ padding:"12px 24px", borderRadius:10, fontSize:13, display:"flex", alignItems:"center", gap:7 }}>
              📲 Notify Me on Launch
            </button>
            <a href="https://instagram.com/unethicalmk" target="_blank" rel="noopener noreferrer" style={{ padding:"12px 24px", borderRadius:10, fontSize:13, display:"flex", alignItems:"center", gap:7, background:"linear-gradient(135deg,#833AB4,#FD1D1D,#F77737)", color:"white", textDecoration:"none", fontWeight:700 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              Follow @unethicalmk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── SHOP PAGE ──────────────────────────────────────────────── */
function ShopPage({ products, category, setCategory, search, onAdd }) {
  const [sort, setSort] = useState("popular");
  const [sizeF, setSizeF] = useState("all");
  const [typeF, setTypeF] = useState("all");
  const [maxP, setMaxP] = useState(999);
  const [visible, setVisible] = useState(48);

  const filtered = useMemo(()=>{
    let P=[...products];
    if(category!=="all") P=P.filter(p=>p.cat===category);
    if(search) P=P.filter(p=>[p.title,p.cat,p.subj].join(" ").toLowerCase().includes(search.toLowerCase()));
    if(sizeF!=="all") P=P.filter(p=>p.size===sizeF);
    if(typeF!=="all") P=P.filter(p=>p.type===typeF);
    P=P.filter(p=>p.price<=maxP);
    if(sort==="popular") P.sort((a,b)=>b.sold-a.sold);
    else if(sort==="rating") P.sort((a,b)=>b.rating-a.rating);
    else if(sort==="low") P.sort((a,b)=>a.price-b.price);
    else if(sort==="high") P.sort((a,b)=>b.price-a.price);
    else P.sort((a,b)=>b.isnew-a.isnew);
    return P;
  },[products,category,search,sizeF,typeF,maxP,sort]);

  const allCats=["all",...Object.keys(COL)];
  const fbs = (active,onClick,label) => (
    <button onClick={onClick} style={{ background:active?"rgba(255,101,0,0.14)":"transparent", border:`1px solid ${active?"#FF6500":"transparent"}`, color:active?"#FF6500":"#9CA3AF", borderRadius:7, padding:"6px 10px", fontSize:11, cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>{label}</button>
  );

  return (
    <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 24px" }}>
      <div style={{ display:"flex", gap:22 }}>
        {/* Sidebar filters */}
        <div style={{ width:216, flexShrink:0 }}>
          <div style={{ background:"#0F0F1A", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:18, position:"sticky", top:74 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, fontWeight:700, color:"#fff", fontSize:13, marginBottom:16 }}>
              <Filter size={13}/> Filters
            </div>

            {/* Category */}
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:10, color:"#4B5563", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Category</div>
              <div style={{ maxHeight:220, overflowY:"auto", display:"flex", flexDirection:"column", gap:3 }}>
                {allCats.map(c=>fbs(category===c,()=>setCategory(c),c==="all"?"All Categories":c))}
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:10, color:"#4B5563", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Size</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {["all","A4","A3","A2","A1"].map(s=>(
                  <button key={s} onClick={()=>setSizeF(s)} style={{ padding:"4px 10px", borderRadius:6, fontSize:11, background:sizeF===s?"rgba(255,101,0,0.14)":"rgba(255,255,255,0.04)", border:`1px solid ${sizeF===s?"#FF6500":"rgba(255,255,255,0.08)"}`, color:sizeF===s?"#FF6500":"#9CA3AF", cursor:"pointer", fontFamily:"inherit" }}>
                    {s==="all"?"All":s}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:10, color:"#4B5563", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Poster Type</div>
              <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                {["all","Complete Concept","Formula Sheet","Mind Map","Quick Revision","Diagram Collection"].map(t=>fbs(typeF===t,()=>setTypeF(t),t==="all"?"All Types":t))}
              </div>
            </div>

            {/* Price */}
            <div>
              <div style={{ fontSize:10, color:"#4B5563", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Max Price: ₹{maxP}</div>
              <input type="range" min={79} max={299} value={maxP} onChange={e=>setMaxP(+e.target.value)} style={{ width:"100%", accentColor:"#FF6500" }}/>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18, flexWrap:"wrap", gap:10 }}>
            <div>
              <span className="dn" style={{ fontSize:22, fontWeight:800, color:"#fff" }}>{category==="all"?"All Posters":category}</span>
              <span style={{ fontSize:13, color:"#6B7280", marginLeft:8 }}>{filtered.length.toLocaleString()} results</span>
            </div>
            <select value={sort} onChange={e=>setSort(e.target.value)} style={{ background:"#0F0F1A", border:"1px solid rgba(255,255,255,0.09)", color:"#fff", borderRadius:9, padding:"8px 12px", fontSize:13, outline:"none", cursor:"pointer" }}>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
          {filtered.length===0?(
            <div style={{ textAlign:"center", padding:"80px 0", color:"#4B5563" }}>
              <BookOpen size={52} color="#1F2937" style={{ margin:"0 auto 12px" }}/>
              <div style={{ fontSize:16, fontWeight:700, marginBottom:6 }}>No posters found</div>
              <div style={{ fontSize:13 }}>Try changing filters or search query</div>
            </div>
          ):(
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14 }}>
              {filtered.slice(0,visible).map(p=><ProductCard key={p.id} p={p} onAdd={onAdd}/>)}
            </div>
          )}
          {visible<filtered.length&&(
            <div style={{ textAlign:"center", marginTop:40 }}>
              <button onClick={()=>setVisible(v=>v+48)} className="tbo" style={{ padding:"12px 32px", borderRadius:12, fontSize:14 }}>
                Load More ({(filtered.length-visible).toLocaleString()} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background:"#07070F", borderTop:"1px solid rgba(255,255,255,0.07)", padding:"48px 48px 28px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:36, marginBottom:40, flexWrap:"wrap" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <div style={{ width:34, height:34, background:"linear-gradient(135deg,#FF6500,#FF9A00)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>📌</div>
              <span className="dn" style={{ fontSize:20, fontWeight:800, color:"#fff" }}>Revise<span style={{ color:"#FF6500" }}>Wall</span></span>
            </div>
            <p style={{ fontSize:13, color:"#6B7280", lineHeight:1.7, maxWidth:270 }}>
              India's most comprehensive educational wall poster brand. From Class 9 to BTech, JEE to UPSC. Paste and learn forever.
            </p>
            <a href="https://instagram.com/unethicalmk" target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:14, background:"linear-gradient(135deg,#833AB4,#FD1D1D,#F77737)", padding:"7px 14px", borderRadius:8, color:"white", textDecoration:"none", fontSize:12, fontWeight:700 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              @unethicalmk
            </a>
          </div>
          {[
            ["Products",["CBSE Posters","JEE Posters","NEET Posters","BTech Posters","Formula Sheets","Mind Maps"]],
            ["Support",["Track Order","Refund Policy","Privacy Policy","Terms of Service","Contact Us","FAQ"]],
            ["Company",["About Us","Our Story","Careers","Blog","Press Kit","Partnerships"]],
          ].map(([title,links])=>(
            <div key={title}>
              <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:14 }}>{title}</div>
              {links.map(l=><div key={l} style={{ fontSize:12, color:"#6B7280", marginBottom:8, cursor:"pointer" }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:22, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ fontSize:12, color:"#4B5563" }}>
            © 2025 ReviseWall · Founder & Owner:{" "}
            <strong style={{ color:"#FF6500" }}>Mukul Kumar</strong>
          </div>
          <div style={{ fontSize:12, color:"#4B5563" }}>Made with ❤️ for India's 50 million students</div>
        </div>
      </div>
    </footer>
  );
}

/* ── MAIN APP ───────────────────────────────────────────────── */
export default function ReviseWall() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const products = useMemo(()=>generateProducts(),[]);

  const addToCart = (p) => {
    setCart(c=>{ const ex=c.find(i=>i.id===p.id); return ex?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}]; });
    setCartOpen(true);
  };
  const updateQty = (id,d) => setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const removeFromCart = (id) => setCart(c=>c.filter(i=>i.id!==id));

  const goShop = (cat="all") => { setCategory(cat); setPage("shop"); };

  return (
    <div className="rw">
      <GS/>
      <Navbar cartCount={cart.reduce((s,i)=>s+i.qty,0)} onCartOpen={()=>setCartOpen(true)} page={page} setPage={setPage} search={search} setSearch={s=>{setSearch(s);if(s)setPage("shop");}}/>
      {page==="home" && <HomePage products={products} onAdd={addToCart} goShop={goShop}/>}
      {page==="shop" && <ShopPage products={products} category={category} setCategory={setCategory} search={search} onAdd={addToCart}/>}
      <Footer/>
      {cartOpen && <CartDrawer cart={cart} onClose={()=>setCartOpen(false)} onQty={updateQty} onRemove={removeFromCart} onCheckout={()=>{setCartOpen(false);setCheckoutOpen(true);}}/>}
      {checkoutOpen && <CheckoutModal cart={cart} onClose={()=>setCheckoutOpen(false)} onSuccess={()=>setCart([])}/>}
    </div>
  );
}
