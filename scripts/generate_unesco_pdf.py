#!/usr/bin/env python3
"""
Dossier UNESCO FashionistART Dour 2027 — v3 avec bannière officielle
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak, Image as RLImage
)
from reportlab.pdfgen import canvas as rl_canvas

# ─── PALETTE ───────────────────────────────────────────────────────────────────
NAVY       = colors.HexColor('#050810')
NAVY2      = colors.HexColor('#0A1020')
GOLD       = colors.HexColor('#D4AF37')
GOLD_LIGHT = colors.HexColor('#F0D060')
PEARL      = colors.HexColor('#F0EDE6')
GRAY_LIGHT = colors.HexColor('#CCCCCC')
GRAY_MED   = colors.HexColor('#888888')

W, H = A4  # 595.28 x 841.89 pts

MARGIN_L = 20*mm
MARGIN_R = 20*mm
MARGIN_T = 18*mm
MARGIN_B = 18*mm
COL_W = W - MARGIN_L - MARGIN_R  # ~555 pts

# Bannière
BANNER_PATH = '/tmp/banniere_fashionistart.png'
BANNER_W    = COL_W           # pleine largeur colonne
BANNER_RATIO = 1881 / 836     # ratio original
BANNER_H_COVER  = BANNER_W / BANNER_RATIO   # ~246 pts — couverture
BANNER_H_HEADER = 28*mm                     # 28mm — en-tête pages intérieures

# ─── STYLES ────────────────────────────────────────────────────────────────────
def S(name, **kw):
    defaults = dict(fontName='Helvetica', fontSize=9.5, leading=14,
                    textColor=PEARL, alignment=TA_LEFT)
    defaults.update(kw)
    return ParagraphStyle(name, **defaults)

def make_styles():
    return {
        'cover_title':   S('ct',  fontName='Helvetica-Bold', fontSize=28, leading=34, textColor=GOLD,    alignment=TA_CENTER, spaceBefore=4*mm, spaceAfter=3*mm),
        'cover_sub':     S('cs',  fontName='Helvetica',      fontSize=13, leading=17, textColor=PEARL,   alignment=TA_CENTER, spaceAfter=2*mm),
        'cover_tag':     S('ctg', fontName='Helvetica-Oblique', fontSize=10, leading=14, textColor=GOLD_LIGHT, alignment=TA_CENTER, spaceAfter=6*mm),
        'section':       S('sec', fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=GOLD,    spaceBefore=5*mm, spaceAfter=3*mm),
        'label':         S('lbl', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=GOLD_LIGHT, spaceAfter=1.5*mm),
        'body':          S('bd',  alignment=TA_JUSTIFY, spaceAfter=2*mm),
        'body_l':        S('bdl', spaceAfter=1.5*mm),
        'small':         S('sm',  fontName='Helvetica', fontSize=7.5, leading=10, textColor=GRAY_LIGHT, alignment=TA_CENTER),
        'kpi_num':       S('kn',  fontName='Helvetica-Bold', fontSize=24, leading=28, textColor=GOLD,    alignment=TA_CENTER),
        'kpi_lbl':       S('kl',  fontName='Helvetica',      fontSize=7.5, leading=10, textColor=PEARL,  alignment=TA_CENTER),
        'step_num':      S('sn',  fontName='Helvetica-Bold', fontSize=16, leading=20, textColor=GOLD,    alignment=TA_CENTER),
        'step_title':    S('st',  fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=GOLD_LIGHT),
        'step_body':     S('sb',  fontName='Helvetica',      fontSize=9,   leading=12, textColor=PEARL,  alignment=TA_JUSTIFY),
        'prog_day':      S('pd',  fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=NAVY),
        'prog_evt':      S('pe',  fontName='Helvetica-Bold', fontSize=9,   leading=12, textColor=NAVY),
        'prog_desc':     S('pde', fontName='Helvetica',      fontSize=8.5, leading=11, textColor=NAVY2),
        'contact_lbl':   S('cl',  fontName='Helvetica-Bold', fontSize=9,   leading=12, textColor=GOLD),
        'contact_val':   S('cv',  fontName='Helvetica',      fontSize=9,   leading=13, textColor=PEARL),
        'header_title':  S('ht',  fontName='Helvetica-Bold', fontSize=8,   leading=10, textColor=GOLD,   alignment=TA_RIGHT),
        'header_page':   S('hp',  fontName='Helvetica',      fontSize=7.5, leading=10, textColor=GRAY_MED, alignment=TA_RIGHT),
    }

# ─── CANVAS CALLBACKS ──────────────────────────────────────────────────────────
def draw_cover_bg(c, doc):
    c.saveState()
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    # Bande gold bas
    c.setFillColor(GOLD)
    c.rect(0, 0, W, 7*mm, fill=1, stroke=0)
    # Pied de page texte
    c.setFont('Helvetica', 6.5)
    c.setFillColor(NAVY)
    c.drawCentredString(W/2, 2.5*mm,
        "ASBL Starlight Dour — BCE 1012.267.056 — www.fashionistartdour.be  |  Conception : Olivier Trevis — www.oliviertrevis.be")
    c.restoreState()

def draw_inner_bg(c, doc):
    c.saveState()
    # Fond sombre
    c.setFillColor(NAVY2)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    # Ligne gold bas
    c.setFillColor(GOLD)
    c.rect(0, MARGIN_B - 4*mm, W, 1.2, fill=1, stroke=0)
    # Footer
    c.setFont('Helvetica', 6.5)
    c.setFillColor(GRAY_MED)
    c.drawCentredString(W/2, MARGIN_B - 8*mm,
        "ASBL Starlight Dour — BCE 1012.267.056  |  www.fashionistartdour.be  |  Olivier Trevis — www.oliviertrevis.be")
    pg = c.getPageNumber() - 1  # page 1 = cover, donc -1
    if pg > 0:
        c.drawRightString(W - MARGIN_R, MARGIN_B - 8*mm, f"Page {pg}")
    c.restoreState()

# ─── HELPERS ───────────────────────────────────────────────────────────────────
def gold_hr(space_after=3*mm):
    return HRFlowable(width=COL_W, thickness=1, color=GOLD, spaceAfter=space_after)

def step_row(num, title, desc, styles, bg_left=None, bg_right=None):
    bg_l = bg_left  or colors.HexColor('#1A1400')
    bg_r = bg_right or colors.HexColor('#0D1020')
    t = Table([[
        Paragraph(num, styles['step_num']),
        [Paragraph(title, styles['step_title']), Spacer(1, 1.5*mm), Paragraph(desc, styles['step_body'])]
    ]], colWidths=[18*mm, COL_W - 18*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), bg_l),
        ('BACKGROUND', (1,0), (1,0), bg_r),
        ('BOX', (0,0), (-1,-1), 0.5, GOLD),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN',  (0,0), (0,0),  'CENTER'),
        ('TOPPADDING',    (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING',   (0,0), (-1,-1), 8),
        ('RIGHTPADDING',  (0,0), (-1,-1), 8),
    ]))
    return t

def banner_header(styles):
    """Bannière réduite + ligne titre pour pages intérieures"""
    img = RLImage(BANNER_PATH, width=COL_W, height=BANNER_H_HEADER)
    return [img, Spacer(1, 3*mm)]

# ─── PAGE 1 — COUVERTURE ───────────────────────────────────────────────────────
def build_cover(styles):
    story = []
    story.append(Spacer(1, 4*mm))

    # ── Bannière grande (couverture) ──
    img = RLImage(BANNER_PATH, width=COL_W, height=BANNER_H_COVER)
    story.append(img)
    story.append(Spacer(1, 6*mm))

    # ── Titre & sous-titre ──
    story.append(Paragraph("DOSSIER DE CANDIDATURE UNESCO 2027", styles['cover_title']))
    story.append(Paragraph("« Art, Mode &amp; Patrimoine Vivant — Dour, Belgique »", styles['cover_tag']))
    story.append(gold_hr(4*mm))

    # ── Tableau infos clés ──
    info_rows = [
        [Paragraph("INFORMATIONS CLÉS", S('ih', fontName='Helvetica-Bold', fontSize=10, textColor=GOLD)), ""],
        [Paragraph("Édition :",           styles['label']), Paragraph("FashionistART Dour 2027",                    styles['body_l'])],
        [Paragraph("Dates :",             styles['label']), Paragraph("15 — 18 avril 2027",                         styles['body_l'])],
        [Paragraph("Lieu :",              styles['label']), Paragraph("Dour, Province de Hainaut, Belgique",         styles['body_l'])],
        [Paragraph("Organisateur :",      styles['label']), Paragraph("ASBL Starlight Dour — BCE 1012.267.056",      styles['body_l'])],
        [Paragraph("Partenaire digital :",styles['label']), Paragraph("Olivier Trevis — www.oliviertrevis.be",             styles['body_l'])],
    ]
    info_t = Table(info_rows, colWidths=[45*mm, COL_W - 45*mm])
    info_t.setStyle(TableStyle([
        ('SPAN',          (0,0), (1,0)),
        ('BACKGROUND',    (0,0), (1,0),  colors.HexColor('#1A1400')),
        ('ROWBACKGROUNDS',(0,1), (1,-1), [colors.HexColor('#0D1020'), colors.HexColor('#111825')]),
        ('BOX',           (0,0), (-1,-1), 1, GOLD),
        ('INNERGRID',     (0,0), (-1,-1), 0.3, colors.HexColor('#2A2A1A')),
        ('TOPPADDING',    (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING',   (0,0), (-1,-1), 8),
        ('RIGHTPADDING',  (0,0), (-1,-1), 8),
        ('VALIGN',        (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(KeepTogether(info_t))
    story.append(Spacer(1, 5*mm))

    # ── KPIs ──
    story.append(Paragraph("CHIFFRES CLÉS", styles['label']))
    story.append(Spacer(1, 2*mm))
    kpis = [
        ("4","jours d'événement"), ("500+","visiteurs attendus"), ("30+","artistes & designers"),
        ("3","espaces d'exposition"), ("10+","partenaires"), ("2027","édition UNESCO"),
    ]
    for row_kpis in [kpis[:3], kpis[3:]]:
        kt = Table(
            [[[ Paragraph(k[0], styles['kpi_num']), Paragraph(k[1], styles['kpi_lbl']) ] for k in row_kpis]],
            colWidths=[COL_W/3]*3
        )
        kt.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#0D1020')),
            ('BOX',        (0,0), (-1,-1), 0.5, GOLD),
            ('INNERGRID',  (0,0), (-1,-1), 0.3, colors.HexColor('#1A1A0A')),
            ('ALIGN',      (0,0), (-1,-1), 'CENTER'),
            ('VALIGN',     (0,0), (-1,-1), 'MIDDLE'),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING',(0,0),(-1,-1), 5),
        ]))
        story.append(kt)
        story.append(Spacer(1, 1.5*mm))

    story.append(PageBreak())
    return story

# ─── PAGE 2 — PRÉSENTATION ─────────────────────────────────────────────────────
def build_page2(styles):
    story = banner_header(styles)
    story.append(Paragraph("01 — PRÉSENTATION DU PROJET", styles['section']))
    story.append(gold_hr())

    story.append(Paragraph(
        "Fashionist'ART Dour est une plateforme culturelle unique en Belgique, fusionnant la mode, "
        "les arts plastiques, la performance et le patrimoine industriel du Borinage. Née de la volonté "
        "de valoriser les talents émergents et l'identité du territoire, l'événement rassemble chaque "
        "année designers, artistes, photographes et créateurs autour d'une vision commune : l'art comme "
        "vecteur de transformation sociale et culturelle.", styles['body']))
    story.append(Spacer(1, 4*mm))

    piliers = [
        ("Multidisciplinaire", "Mode, arts visuels, performance, photographie réunis en un seul événement"),
        ("Patrimoine Borinage","Dialogue entre création contemporaine et héritage industriel minier"),
        ("Rayonnement",        "Participants de Belgique, France, Luxembourg et au-delà"),
        ("Communauté",         "Engagement fort des habitants, écoles et associations locales"),
    ]
    for i in range(0, 4, 2):
        p1, p2 = piliers[i], piliers[i+1]
        t = Table([[
            [Paragraph(f"▸ {p1[0]}", styles['step_title']), Paragraph(p1[1], styles['step_body'])],
            [Paragraph(f"▸ {p2[0]}", styles['step_title']), Paragraph(p2[1], styles['step_body'])],
        ]], colWidths=[COL_W/2 - 2*mm, COL_W/2 - 2*mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#0D1020')),
            ('BOX',        (0,0), (-1,-1), 0.3, colors.HexColor('#2A2A1A')),
            ('VALIGN',     (0,0), (-1,-1), 'TOP'),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING',(0,0),(-1,-1), 6),
            ('LEFTPADDING',(0,0), (-1,-1), 8),
            ('RIGHTPADDING',(0,0),(-1,-1), 8),
        ]))
        story.append(t)
        story.append(Spacer(1, 2*mm))

    story.append(Spacer(1, 5*mm))
    story.append(Paragraph("02 — VISION, MISSION &amp; VALEURS", styles['section']))
    story.append(gold_hr())
    story.append(Paragraph(
        "<b>Notre Vision :</b> Faire de Dour un pôle culturel de référence en Wallonie, où l'art "
        "contemporain dialogue avec le patrimoine industriel et l'identité d'un territoire en pleine renaissance.",
        styles['body']))
    story.append(Spacer(1, 4*mm))

    missions = [
        ("01","Valoriser les Talents",
         "Identifier, accompagner et mettre en lumière les jeunes créateurs et artistes émergents, en leur offrant une visibilité nationale et internationale."),
        ("02","Préserver le Patrimoine",
         "Tisser un lien vivant entre création contemporaine et histoire industrielle et minière du Borinage, héritage UNESCO reconnu."),
        ("03","Fédérer la Communauté",
         "Créer des ponts entre habitants, associations, écoles et acteurs culturels du territoire pour renforcer le tissu social local."),
        ("04","Rayonnement International",
         "Positionner FashionistART Dour comme événement incontournable du calendrier culturel belge et francophone."),
    ]
    for num, title, desc in missions:
        story.append(step_row(num, title, desc, styles))
        story.append(Spacer(1, 2*mm))

    story.append(PageBreak())
    return story

# ─── PAGE 3 — PROGRAMME ────────────────────────────────────────────────────────
def build_page3(styles):
    story = banner_header(styles)
    story.append(Paragraph("03 — PROGRAMME ÉDITION 2027", styles['section']))
    story.append(gold_hr())
    story.append(Paragraph(
        "L'édition 2027 se déroulera du <b>15 au 18 avril 2027</b> dans plusieurs espaces emblématiques "
        "de la commune, incluant le Centre Culturel, le Centre Sportif d'Élouges et des espaces publics du centre-ville de Dour.",
        styles['body']))
    story.append(Spacer(1, 4*mm))

    programme = [
        ("Mercredi 15/04","Vernissage &amp; Inauguration",
         "Ouverture officielle avec autorités locales. Vernissage des expositions. Accueil des délégations et partenaires institutionnels."),
        ("Jeudi 16/04","Workshops &amp; Masterclasses",
         "Ateliers animés par des créateurs confirmés. Ouvert au public et aux étudiants en art, mode et design. Sessions de mentoring."),
        ("Vendredi 17/04","Défilés &amp; Performances",
         "Collections des designers émergents. Concours jeunes talents avec jury professionnel. Performances artistiques live."),
        ("Samedi 18/04","Grand Gala de Clôture",
         "Remise des prix. Spectacle final. Cocktail networking artistes &amp; partenaires. Clôture officielle."),
    ]
    for day, evt, desc in programme:
        t = Table([[
            Paragraph(day, styles['prog_day']),
            [Paragraph(evt, styles['prog_evt']), Spacer(1,1.5*mm), Paragraph(desc, styles['prog_desc'])]
        ]], colWidths=[32*mm, COL_W - 32*mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (0,0), GOLD),
            ('BACKGROUND', (1,0), (1,0), PEARL),
            ('BOX',        (0,0), (-1,-1), 0.5, GOLD),
            ('VALIGN',     (0,0), (-1,-1), 'MIDDLE'),
            ('ALIGN',      (0,0), (0,0),   'CENTER'),
            ('TOPPADDING', (0,0), (-1,-1), 7),
            ('BOTTOMPADDING',(0,0),(-1,-1), 7),
            ('LEFTPADDING',(0,0), (-1,-1), 8),
            ('RIGHTPADDING',(0,0),(-1,-1), 8),
        ]))
        story.append(t)
        story.append(Spacer(1, 3*mm))

    story.append(Spacer(1, 4*mm))
    story.append(Paragraph("LIEUX &amp; ESPACES", styles['label']))
    story.append(Spacer(1, 2*mm))
    lieux = [
        ("Centre Culturel de Dour",        "Expositions, défilés, performances scéniques"),
        ("Centre Sportif d'Élouges",        "Grands défilés, spectacle de clôture"),
        ("Espaces publics — Centre-Ville",  "Installations artistiques, performances urbaines"),
    ]
    for lieu, desc in lieux:
        t = Table([[
            Paragraph(f"📍 {lieu}", styles['step_title']),
            Paragraph(desc, styles['step_body'])
        ]], colWidths=[60*mm, COL_W - 60*mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#0D1020')),
            ('BOX',        (0,0), (-1,-1), 0.3, colors.HexColor('#2A2A1A')),
            ('VALIGN',     (0,0), (-1,-1), 'MIDDLE'),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING',(0,0),(-1,-1), 5),
            ('LEFTPADDING',(0,0), (-1,-1), 8),
            ('RIGHTPADDING',(0,0),(-1,-1), 8),
        ]))
        story.append(t)
        story.append(Spacer(1, 1.5*mm))

    story.append(PageBreak())
    return story

# ─── PAGE 4 — UNESCO ───────────────────────────────────────────────────────────
def build_page4(styles):
    story = banner_header(styles)
    story.append(Paragraph("04 — CANDIDATURE UNESCO", styles['section']))
    story.append(gold_hr())
    story.append(Paragraph(
        "FashionistART Dour s'inscrit pleinement dans les critères de reconnaissance UNESCO pour le "
        "<b>Patrimoine Culturel Immatériel (PCI)</b>, au regard de la Convention de 2003 pour la "
        "sauvegarde du patrimoine culturel immatériel.",
        styles['body']))
    story.append(Spacer(1, 4*mm))

    criteres = [
        ("R.1","Transmission intergénérationnelle",
         "Les savoir-faire artistiques (mode, photographie, arts plastiques) sont transmis de manière vivante entre générations de créateurs locaux."),
        ("R.2","Identité culturelle communautaire",
         "L'événement renforce le sentiment d'appartenance et l'identité culturelle de la communauté de Dour et du Borinage."),
        ("R.3","Visibilité &amp; Valorisation",
         "Chaque édition documente, archive et met en valeur les pratiques artistiques contemporaines du territoire."),
        ("R.4","Participation active",
         "La communauté locale est pleinement actrice : artistes, bénévoles, associations et habitants co-construisent l'événement."),
        ("R.5","Inventaire &amp; Documentation",
         "Catalogues, archives photographiques et vidéo constituent un corpus documentaire en croissance continue depuis les premières éditions."),
    ]
    for code, title, desc in criteres:
        story.append(step_row(code, title, desc, styles))
        story.append(Spacer(1, 2.5*mm))

    story.append(Spacer(1, 4*mm))
    story.append(Paragraph("SOUTIEN INSTITUTIONNEL", styles['label']))
    story.append(Spacer(1, 2*mm))
    soutiens = [
        ("Commune de Dour",              "Partenaire officiel — soutien logistique et financier"),
        ("Province de Hainaut",          "Soutien culturel provincial"),
        ("Fédération Wallonie-Bruxelles","Programme d'aide aux arts de la scène"),
        ("ASBL Starlight Dour",          "Organisateur officiel — BCE 1012.267.056"),
        ("Olivier Trevis",                  "Partenaire digital &amp; communication — www.oliviertrevis.be"),
    ]
    st = Table([[Paragraph(s[0], styles['contact_lbl']), Paragraph(s[1], styles['step_body'])] for s in soutiens],
               colWidths=[55*mm, COL_W - 55*mm])
    st.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0,0), (-1,-1), [colors.HexColor('#0D1020'), colors.HexColor('#111825')]),
        ('BOX',            (0,0), (-1,-1), 0.5, GOLD),
        ('INNERGRID',      (0,0), (-1,-1), 0.3, colors.HexColor('#1A1A0A')),
        ('VALIGN',         (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING',     (0,0), (-1,-1), 6),
        ('BOTTOMPADDING',  (0,0), (-1,-1), 6),
        ('LEFTPADDING',    (0,0), (-1,-1), 8),
        ('RIGHTPADDING',   (0,0), (-1,-1), 8),
    ]))
    story.append(st)
    story.append(PageBreak())
    return story

# ─── PAGE 5 — NOS VALEURS ──────────────────────────────────────────────────────
def build_page5(styles):
    story = banner_header(styles)
    story.append(Paragraph("05 — NOS VALEURS", styles['section']))
    story.append(gold_hr())

    valeurs = [
        ("Inclusivité",    "Ouvert à tous, sans distinction de genre, d'âge ou d'origine"),
        ("Excellence",     "Exigence artistique et professionnalisme dans chaque production"),
        ("Ancrage Local",  "Profondément enraciné dans l'identité et les valeurs du Borinage"),
        ("Innovation",     "Formats nouveaux, hybridation des disciplines, numérique et vivant"),
        ("Transmission",   "Partage des savoir-faire artistiques entre générations"),
        ("Rayonnement",    "Ambition internationale, ancrage local profond"),
    ]
    for i in range(0, 6, 2):
        v1, v2 = valeurs[i], valeurs[i+1]
        t = Table([[
            [Paragraph(f"★  {v1[0]}", styles['step_title']), Spacer(1,1.5*mm), Paragraph(v1[1], styles['step_body'])],
            [Paragraph(f"★  {v2[0]}", styles['step_title']), Spacer(1,1.5*mm), Paragraph(v2[1], styles['step_body'])],
        ]], colWidths=[COL_W/2 - 2*mm, COL_W/2 - 2*mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#0A0A18')),
            ('BOX',        (0,0), (-1,-1), 0.5, colors.HexColor('#2A2A1A')),
            ('VALIGN',     (0,0), (-1,-1), 'TOP'),
            ('TOPPADDING', (0,0), (-1,-1), 7),
            ('BOTTOMPADDING',(0,0),(-1,-1), 7),
            ('LEFTPADDING',(0,0), (-1,-1), 10),
            ('RIGHTPADDING',(0,0),(-1,-1), 10),
        ]))
        story.append(t)
        story.append(Spacer(1, 3*mm))

    story.append(PageBreak())
    return story

# ─── PAGE 6 — CONTACT ──────────────────────────────────────────────────────────
def build_page6(styles):
    story = banner_header(styles)
    story.append(Paragraph("CONTACT &amp; INFORMATIONS", styles['section']))
    story.append(gold_hr())

    contacts = [
        ("Organisateur",          "ASBL Starlight Dour — BCE 1012.267.056"),
        ("Direction Artistique",  "Olivier Trevis"),
        ("Site Olivier Trevis",   "www.oliviertrevis.be"),
        ("Site FashionistART",    "www.fashionistartdour.be"),
        ("Dossier UNESCO",        "www.oliviertrevis.be/unesco"),
        ("Contact email",         "contact@fashionistartdour.be"),
        ("Email direction",       "oliviertrevis@outlook.be"),
        ("Partenaire Digital",    "Olivier Trevis — www.oliviertrevis.be"),
    ]
    ct = Table([[Paragraph(c[0], styles['contact_lbl']), Paragraph(c[1], styles['contact_val'])] for c in contacts],
               colWidths=[55*mm, COL_W - 55*mm])
    ct.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0,0), (-1,-1), [colors.HexColor('#0D1020'), colors.HexColor('#111825')]),
        ('BOX',            (0,0), (-1,-1), 1, GOLD),
        ('INNERGRID',      (0,0), (-1,-1), 0.3, colors.HexColor('#1A1A0A')),
        ('VALIGN',         (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING',     (0,0), (-1,-1), 8),
        ('BOTTOMPADDING',  (0,0), (-1,-1), 8),
        ('LEFTPADDING',    (0,0), (-1,-1), 10),
        ('RIGHTPADDING',   (0,0), (-1,-1), 10),
    ]))
    story.append(ct)
    story.append(Spacer(1, 10*mm))
    story.append(gold_hr(4*mm))
    story.append(Paragraph("FashionistART Dour — Dossier de Candidature UNESCO 2027",
                            S('ft', fontName='Helvetica-Bold', fontSize=10, textColor=GOLD, alignment=TA_CENTER)))
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph(
        "Ce dossier est la propriété de l'ASBL Starlight Dour. Toute reproduction est soumise à autorisation écrite.",
        styles['small']))
    story.append(Spacer(1, 2*mm))
    story.append(Paragraph(
        "Conception &amp; Réalisation digitale : Olivier Trevis — www.oliviertrevis.be",
        styles['small']))
    return story

# ─── MAIN ───────────────────────────────────────────────────────────────────────
def generate(output_path):
    styles = make_styles()

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T,
        bottomMargin=MARGIN_B + 10*mm,
        title="Dossier UNESCO FashionistART Dour 2027",
        author="ASBL Starlight Dour — Olivier Trevis",
    )

    story = []
    story += build_cover(styles)
    story += build_page2(styles)
    story += build_page3(styles)
    story += build_page4(styles)
    story += build_page5(styles)
    story += build_page6(styles)

    doc.build(story,
              onFirstPage=draw_cover_bg,
              onLaterPages=draw_inner_bg)

    sz = os.path.getsize(output_path)
    print(f"✅ PDF généré : {output_path}  ({sz:,} bytes)")

if __name__ == '__main__':
    generate('/tmp/Dossier_UNESCO_FashionistART_2027_v3.pdf')
