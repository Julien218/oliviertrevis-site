#!/usr/bin/env python3
"""
Génère le dossier UNESCO FashionistART Dour 2027 — version v3 mise en page propre
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak, Image
)
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import urllib.request, ssl, io

# ─── PALETTE ───────────────────────────────────────────────────────────────────
NAVY       = colors.HexColor('#050810')
NAVY2      = colors.HexColor('#0A1020')
GOLD       = colors.HexColor('#D4AF37')
GOLD_LIGHT = colors.HexColor('#F0D060')
PEARL      = colors.HexColor('#F0EDE6')
WHITE      = colors.white
GRAY_LIGHT = colors.HexColor('#CCCCCC')
GRAY_MED   = colors.HexColor('#888888')
GOLD_BG    = colors.HexColor('#1A1600')

W, H = A4  # 595.28 x 841.89 pts

# Marges
MARGIN_L = 20*mm
MARGIN_R = 20*mm
MARGIN_T = 18*mm
MARGIN_B = 20*mm
COL_W = W - MARGIN_L - MARGIN_R  # ~555 pts

# ─── STYLES ────────────────────────────────────────────────────────────────────
def make_styles():
    styles = {}

    styles['cover_title'] = ParagraphStyle(
        'cover_title',
        fontName='Helvetica-Bold',
        fontSize=32,
        leading=38,
        textColor=GOLD,
        alignment=TA_CENTER,
        spaceAfter=4*mm,
    )
    styles['cover_subtitle'] = ParagraphStyle(
        'cover_subtitle',
        fontName='Helvetica',
        fontSize=14,
        leading=18,
        textColor=PEARL,
        alignment=TA_CENTER,
        spaceAfter=3*mm,
    )
    styles['cover_tagline'] = ParagraphStyle(
        'cover_tagline',
        fontName='Helvetica-Oblique',
        fontSize=11,
        leading=15,
        textColor=GOLD_LIGHT,
        alignment=TA_CENTER,
        spaceAfter=8*mm,
    )
    styles['section_title'] = ParagraphStyle(
        'section_title',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=GOLD,
        spaceBefore=6*mm,
        spaceAfter=3*mm,
    )
    styles['label'] = ParagraphStyle(
        'label',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=GOLD_LIGHT,
        spaceBefore=0,
        spaceAfter=1*mm,
    )
    styles['body'] = ParagraphStyle(
        'body',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=PEARL,
        alignment=TA_JUSTIFY,
        spaceAfter=2*mm,
    )
    styles['body_left'] = ParagraphStyle(
        'body_left',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=PEARL,
        alignment=TA_LEFT,
        spaceAfter=1.5*mm,
    )
    styles['small'] = ParagraphStyle(
        'small',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=GRAY_LIGHT,
        alignment=TA_CENTER,
    )
    styles['footer'] = ParagraphStyle(
        'footer',
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=GRAY_MED,
        alignment=TA_CENTER,
    )
    styles['kpi_number'] = ParagraphStyle(
        'kpi_number',
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=30,
        textColor=GOLD,
        alignment=TA_CENTER,
    )
    styles['kpi_label'] = ParagraphStyle(
        'kpi_label',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=PEARL,
        alignment=TA_CENTER,
    )
    styles['step_num'] = ParagraphStyle(
        'step_num',
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=GOLD,
        alignment=TA_CENTER,
    )
    styles['step_title'] = ParagraphStyle(
        'step_title',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=GOLD_LIGHT,
        alignment=TA_LEFT,
    )
    styles['step_body'] = ParagraphStyle(
        'step_body',
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=PEARL,
        alignment=TA_JUSTIFY,
    )
    styles['prog_day'] = ParagraphStyle(
        'prog_day',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=NAVY,
        alignment=TA_LEFT,
    )
    styles['prog_event'] = ParagraphStyle(
        'prog_event',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=NAVY,
        alignment=TA_LEFT,
    )
    styles['prog_desc'] = ParagraphStyle(
        'prog_desc',
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=NAVY2,
        alignment=TA_LEFT,
    )
    styles['contact_label'] = ParagraphStyle(
        'contact_label',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=GOLD,
        alignment=TA_LEFT,
    )
    styles['contact_val'] = ParagraphStyle(
        'contact_val',
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=PEARL,
        alignment=TA_LEFT,
    )
    return styles

# ─── CANVAS BACKGROUND ─────────────────────────────────────────────────────────
def draw_page_background(canvas_obj, doc):
    """Fond sombre + bande dorée en haut + footer"""
    canvas_obj.saveState()
    # Fond principal
    canvas_obj.setFillColor(NAVY2)
    canvas_obj.rect(0, 0, W, H, fill=1, stroke=0)
    # Bande dorée en haut
    canvas_obj.setFillColor(GOLD)
    canvas_obj.rect(0, H - 10*mm, W, 10*mm, fill=1, stroke=0)
    # Ligne dorée en bas
    canvas_obj.setFillColor(GOLD)
    canvas_obj.rect(0, MARGIN_B - 2*mm, W, 1.5, fill=1, stroke=0)
    # Footer
    canvas_obj.setFont('Helvetica', 7)
    canvas_obj.setFillColor(GRAY_MED)
    canvas_obj.drawCentredString(W/2, MARGIN_B - 8*mm,
        "ASBL Starlight Dour — BCE 1012.267.056 — www.fashionistartdour.be  |  Conception : JS-Innov.IA — www.jsinnovia.com")
    # Numéro de page
    page_num = canvas_obj.getPageNumber()
    if page_num > 1:
        canvas_obj.drawRightString(W - MARGIN_R, MARGIN_B - 8*mm, f"Page {page_num}")
    canvas_obj.restoreState()

def draw_cover_background(canvas_obj, doc):
    """Fond couverture avec dégradé simulé"""
    canvas_obj.saveState()
    canvas_obj.setFillColor(NAVY)
    canvas_obj.rect(0, 0, W, H, fill=1, stroke=0)
    # Accent gold haut
    canvas_obj.setFillColor(GOLD)
    canvas_obj.rect(0, H - 12*mm, W, 12*mm, fill=1, stroke=0)
    # Accent gold bas
    canvas_obj.setFillColor(GOLD)
    canvas_obj.rect(0, 0, W, 8*mm, fill=1, stroke=0)
    # Ligne décorative
    canvas_obj.setFillColor(colors.HexColor('#1A1400'))
    canvas_obj.rect(MARGIN_L, H*0.52, COL_W, 1, fill=1, stroke=0)
    canvas_obj.restoreState()

# ─── PAGES ─────────────────────────────────────────────────────────────────────

def build_cover(styles):
    """Page 1 — Couverture"""
    story = []

    story.append(Spacer(1, 22*mm))

    # Titre principal
    story.append(Paragraph("FASHIONIST'ART DOUR", styles['cover_title']))
    story.append(Paragraph("Dossier de Candidature UNESCO 2027", styles['cover_subtitle']))
    story.append(Paragraph("« Art, Mode &amp; Patrimoine Vivant — Dour, Belgique »", styles['cover_tagline']))

    # Ligne dorée
    story.append(HRFlowable(width=COL_W, thickness=1.5, color=GOLD, spaceAfter=6*mm))

    # Bloc INFORMATIONS CLÉS — tableau propre
    info_data = [
        [Paragraph("INFORMATIONS CLÉS", ParagraphStyle('ih', fontName='Helvetica-Bold', fontSize=10, textColor=GOLD, alignment=TA_LEFT)), ""],
        [Paragraph("Édition :", styles['label']),      Paragraph("FashionistART Dour 2027", styles['body_left'])],
        [Paragraph("Dates :", styles['label']),         Paragraph("15 — 18 avril 2027", styles['body_left'])],
        [Paragraph("Lieu :", styles['label']),          Paragraph("Dour, Province de Hainaut, Belgique", styles['body_left'])],
        [Paragraph("Organisateur :", styles['label']),  Paragraph("ASBL Starlight Dour — BCE 1012.267.056", styles['body_left'])],
        [Paragraph("Partenaire digital :", styles['label']), Paragraph("JS-Innov.IA — www.jsinnovia.com", styles['body_left'])],
    ]
    info_table = Table(info_data, colWidths=[45*mm, COL_W - 45*mm])
    info_table.setStyle(TableStyle([
        ('SPAN', (0,0), (1,0)),
        ('BACKGROUND', (0,0), (1,0), colors.HexColor('#1A1400')),
        ('BACKGROUND', (0,1), (1,-1), colors.HexColor('#0D1020')),
        ('ROWBACKGROUNDS', (0,1), (1,-1), [colors.HexColor('#0D1020'), colors.HexColor('#111825')]),
        ('BOX', (0,0), (-1,-1), 1, GOLD),
        ('INNERGRID', (0,0), (-1,-1), 0.3, colors.HexColor('#2A2A1A')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('FONTSIZE', (0,0), (1,0), 10),
    ]))
    story.append(KeepTogether(info_table))
    story.append(Spacer(1, 6*mm))

    # Section présentation courte
    story.append(HRFlowable(width=COL_W, thickness=0.5, color=GOLD, spaceAfter=4*mm))
    story.append(Paragraph("01 — PRÉSENTATION DU PROJET", styles['section_title']))

    story.append(Paragraph(
        "Fashionist'ART Dour est une plateforme culturelle unique en Belgique, fusionnant la mode, "
        "les arts plastiques, la performance et le patrimoine industriel du Borinage. Née de la volonté "
        "de valoriser les talents émergents et l'identité du territoire, l'événement rassemble chaque "
        "année designers, artistes, photographes et créateurs autour d'une vision commune : l'art comme "
        "vecteur de transformation sociale et culturelle.",
        styles['body']
    ))
    story.append(Spacer(1, 4*mm))

    # 4 piliers en 2 colonnes
    piliers = [
        ("Multidisciplinaire", "Mode, arts visuels, performance, photographie réunis en un seul événement"),
        ("Patrimoine Borinage", "Dialogue entre création contemporaine et héritage industriel minier"),
        ("Rayonnement", "Participants de Belgique, France, Luxembourg et au-delà"),
        ("Communauté", "Engagement fort des habitants, écoles et associations locales"),
    ]
    pilier_cells = []
    for j in range(0, 4, 2):
        p1 = piliers[j]
        p2 = piliers[j+1]
        c1 = [
            Paragraph(f"▸ {p1[0]}", styles['step_title']),
            Paragraph(p1[1], styles['step_body']),
        ]
        c2 = [
            Paragraph(f"▸ {p2[0]}", styles['step_title']),
            Paragraph(p2[1], styles['step_body']),
        ]
        pilier_cells.append([c1, c2])

    from reportlab.platypus import ListFlowable, ListItem
    for row in pilier_cells:
        pt = Table([[row[0], row[1]]], colWidths=[COL_W/2 - 3*mm, COL_W/2 - 3*mm])
        pt.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 6),
            ('RIGHTPADDING', (0,0), (-1,-1), 6),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(pt)

    story.append(Spacer(1, 4*mm))

    # CHIFFRES CLÉS — 6 KPIs en grille 3x2
    story.append(HRFlowable(width=COL_W, thickness=0.5, color=GOLD, spaceAfter=3*mm))
    story.append(Paragraph("CHIFFRES CLÉS", styles['label']))
    story.append(Spacer(1, 2*mm))

    kpis = [
        ("4", "jours d'événement"),
        ("500+", "visiteurs attendus"),
        ("30+", "artistes & designers"),
        ("3", "espaces d'exposition"),
        ("10+", "partenaires"),
        ("2027", "édition UNESCO"),
    ]
    kpi_row1 = [[
        [Paragraph(k[0], styles['kpi_number']), Paragraph(k[1], styles['kpi_label'])]
        for k in kpis[:3]
    ]]
    kpi_row2 = [[
        [Paragraph(k[0], styles['kpi_number']), Paragraph(k[1], styles['kpi_label'])]
        for k in kpis[3:]
    ]]

    for kpi_row in [kpi_row1, kpi_row2]:
        kt = Table(kpi_row[0], colWidths=[COL_W/3]*3)
        kt.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#0D1020')),
            ('BOX', (0,0), (-1,-1), 0.5, GOLD),
            ('INNERGRID', (0,0), (-1,-1), 0.3, colors.HexColor('#1A1A0A')),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ]))
        story.append(kt)
        story.append(Spacer(1, 1*mm))

    story.append(Spacer(1, 4*mm))
    story.append(Paragraph(
        "Conception &amp; Réalisation digitale : JS-Innov.IA — www.jsinnovia.com\n© 2027 ASBL Starlight Dour — Tous droits réservés",
        styles['small']
    ))

    story.append(PageBreak())
    return story

def build_page2(styles):
    """Page 2 — Vision, Mission & Valeurs"""
    story = []
    story.append(Spacer(1, 6*mm))
    story.append(Paragraph("02 — VISION, MISSION &amp; VALEURS", styles['section_title']))
    story.append(HRFlowable(width=COL_W, thickness=1, color=GOLD, spaceAfter=4*mm))

    story.append(Paragraph(
        "<b>Notre Vision :</b> Faire de Dour un pôle culturel de référence en Wallonie, où l'art "
        "contemporain dialogue avec le patrimoine industriel et l'identité d'un territoire en pleine renaissance.",
        styles['body']
    ))
    story.append(Spacer(1, 5*mm))

    missions = [
        ("01", "Valoriser les Talents",
         "Identifier, accompagner et mettre en lumière les jeunes créateurs et artistes émergents, "
         "en leur offrant une visibilité nationale et internationale."),
        ("02", "Préserver le Patrimoine",
         "Tisser un lien vivant entre création contemporaine et histoire industrielle et minière du "
         "Borinage, héritage UNESCO reconnu."),
        ("03", "Fédérer la Communauté",
         "Créer des ponts entre habitants, associations, écoles et acteurs culturels du territoire "
         "pour renforcer le tissu social local."),
        ("04", "Rayonnement International",
         "Positionner FashionistART Dour comme événement incontournable du calendrier culturel "
         "belge et francophone."),
    ]

    for num, title, desc in missions:
        row = Table([[
            Paragraph(num, styles['step_num']),
            [Paragraph(title, styles['step_title']), Spacer(1, 1.5*mm), Paragraph(desc, styles['step_body'])]
        ]], colWidths=[18*mm, COL_W - 18*mm])
        row.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (0,0), colors.HexColor('#1A1400')),
            ('BACKGROUND', (1,0), (1,0), colors.HexColor('#0D1020')),
            ('BOX', (0,0), (-1,-1), 0.5, GOLD),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('ALIGN', (0,0), (0,0), 'CENTER'),
            ('TOPPADDING', (0,0), (-1,-1), 7),
            ('BOTTOMPADDING', (0,0), (-1,-1), 7),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(row)
        story.append(Spacer(1, 2.5*mm))

    story.append(Spacer(1, 4*mm))
    story.append(Paragraph("NOS VALEURS", styles['label']))
    story.append(Spacer(1, 2*mm))

    valeurs = [
        ("Inclusivité", "Ouvert à tous, sans distinction de genre, d'âge ou d'origine"),
        ("Excellence", "Exigence artistique et professionnalisme dans chaque production"),
        ("Ancrage Local", "Profondément enraciné dans l'identité et les valeurs du Borinage"),
        ("Innovation", "Formats nouveaux, hybridation des disciplines, numérique et vivant"),
    ]
    val_data = []
    for i in range(0, 4, 2):
        v1, v2 = valeurs[i], valeurs[i+1]
        c1 = [Paragraph(f"★ {v1[0]}", styles['step_title']), Paragraph(v1[1], styles['step_body'])]
        c2 = [Paragraph(f"★ {v2[0]}", styles['step_title']), Paragraph(v2[1], styles['step_body'])]
        t = Table([[c1, c2]], colWidths=[COL_W/2 - 2*mm, COL_W/2 - 2*mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#0A0A18')),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#2A2A1A')),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(t)
        story.append(Spacer(1, 2*mm))

    story.append(PageBreak())
    return story

def build_page3(styles):
    """Page 3 — Programme 2027"""
    story = []
    story.append(Spacer(1, 6*mm))
    story.append(Paragraph("03 — PROGRAMME ÉDITION 2027", styles['section_title']))
    story.append(HRFlowable(width=COL_W, thickness=1, color=GOLD, spaceAfter=4*mm))

    story.append(Paragraph(
        "L'édition 2027 se déroulera du <b>15 au 18 avril 2027</b> dans plusieurs espaces emblématiques "
        "de la commune, incluant le Centre Culturel, le Centre Sportif d'Élouges et des espaces publics "
        "du centre-ville de Dour.",
        styles['body']
    ))
    story.append(Spacer(1, 5*mm))

    programme = [
        ("Mercredi 15/04", "Vernissage &amp; Inauguration",
         "Ouverture officielle avec autorités locales. Vernissage des expositions. Accueil des "
         "délégations et partenaires institutionnels."),
        ("Jeudi 16/04", "Workshops &amp; Masterclasses",
         "Ateliers animés par des créateurs confirmés. Ouvert au public et aux étudiants en art, mode "
         "et design. Sessions de mentoring."),
        ("Vendredi 17/04", "Défilés &amp; Performances",
         "Collections des designers émergents. Concours jeunes talents avec jury professionnel. "
         "Performances artistiques live."),
        ("Samedi 18/04", "Grand Gala de Clôture",
         "Remise des prix. Spectacle final. Cocktail networking artistes &amp; partenaires. "
         "Clôture officielle."),
    ]

    gold_cells = [colors.HexColor('#1A1400'), colors.HexColor('#0D1020'),
                  colors.HexColor('#1A1400'), colors.HexColor('#0D1020')]

    for idx, (day, event, desc) in enumerate(programme):
        bg = gold_cells[idx % 2]
        row_data = [[
            Paragraph(day, styles['prog_day']),
            [Paragraph(event, styles['prog_event']), Spacer(1, 1.5*mm), Paragraph(desc, styles['prog_desc'])]
        ]]
        t = Table(row_data, colWidths=[32*mm, COL_W - 32*mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (0,0), GOLD),
            ('BACKGROUND', (1,0), (1,0), PEARL),
            ('BOX', (0,0), (-1,-1), 0.5, GOLD),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('ALIGN', (0,0), (0,0), 'CENTER'),
            ('TOPPADDING', (0,0), (-1,-1), 8),
            ('BOTTOMPADDING', (0,0), (-1,-1), 8),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(t)
        story.append(Spacer(1, 3*mm))

    story.append(Spacer(1, 4*mm))

    # Espaces
    story.append(Paragraph("LIEUX &amp; ESPACES", styles['label']))
    story.append(Spacer(1, 2*mm))

    lieux = [
        ("Centre Culturel de Dour", "Expositions, défilés, performances scéniques"),
        ("Centre Sportif d'Élouges", "Grands défilés, spectacle de clôture"),
        ("Espaces publics — Centre-Ville", "Installations artistiques, performances urbaines"),
    ]
    for lieu, desc in lieux:
        t = Table([[
            Paragraph(f"📍 {lieu}", styles['step_title']),
            Paragraph(desc, styles['step_body'])
        ]], colWidths=[55*mm, COL_W - 55*mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#0D1020')),
            ('BOX', (0,0), (-1,-1), 0.3, colors.HexColor('#2A2A1A')),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(t)
        story.append(Spacer(1, 1.5*mm))

    story.append(PageBreak())
    return story

def build_page4(styles):
    """Page 4 — Candidature UNESCO"""
    story = []
    story.append(Spacer(1, 6*mm))
    story.append(Paragraph("04 — CANDIDATURE UNESCO", styles['section_title']))
    story.append(HRFlowable(width=COL_W, thickness=1, color=GOLD, spaceAfter=4*mm))

    story.append(Paragraph(
        "FashionistART Dour s'inscrit pleinement dans les critères de reconnaissance UNESCO pour le "
        "<b>Patrimoine Culturel Immatériel (PCI)</b>, au regard de la Convention de 2003 pour la "
        "sauvegarde du patrimoine culturel immatériel.",
        styles['body']
    ))
    story.append(Spacer(1, 4*mm))

    criteres = [
        ("R.1", "Transmission intergénérationnelle",
         "Les savoir-faire artistiques (mode, photographie, arts plastiques) sont transmis de manière "
         "vivante entre générations de créateurs locaux."),
        ("R.2", "Identité culturelle communautaire",
         "L'événement renforce le sentiment d'appartenance et l'identité culturelle de la communauté "
         "de Dour et du Borinage."),
        ("R.3", "Visibilité &amp; Valorisation",
         "Chaque édition documente, archive et met en valeur les pratiques artistiques contemporaines "
         "du territoire."),
        ("R.4", "Participation active",
         "La communauté locale est pleinement actrice : artistes, bénévoles, associations et habitants "
         "co-construisent l'événement."),
        ("R.5", "Inventaire &amp; Documentation",
         "Catalogues, archives photographiques et vidéo constituent un corpus documentaire en "
         "croissance continue depuis les premières éditions."),
    ]

    for code, title, desc in criteres:
        t = Table([[
            Paragraph(code, styles['step_num']),
            [Paragraph(title, styles['step_title']), Spacer(1, 1.5*mm), Paragraph(desc, styles['step_body'])]
        ]], colWidths=[18*mm, COL_W - 18*mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (0,0), colors.HexColor('#1A1400')),
            ('BACKGROUND', (1,0), (1,0), colors.HexColor('#0D1020')),
            ('BOX', (0,0), (-1,-1), 0.5, GOLD),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('ALIGN', (0,0), (0,0), 'CENTER'),
            ('TOPPADDING', (0,0), (-1,-1), 7),
            ('BOTTOMPADDING', (0,0), (-1,-1), 7),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(t)
        story.append(Spacer(1, 2.5*mm))

    story.append(Spacer(1, 5*mm))
    story.append(Paragraph("SOUTIEN INSTITUTIONNEL", styles['label']))
    story.append(Spacer(1, 2*mm))

    soutiens = [
        ("Commune de Dour", "Partenaire officiel — soutien logistique et financier"),
        ("Province de Hainaut", "Soutien culturel provincial"),
        ("Fédération Wallonie-Bruxelles", "Programme d'aide aux arts de la scène"),
        ("ASBL Starlight Dour", "Organisateur officiel — BCE 1012.267.056"),
        ("JS-Innov.IA", "Partenaire digital &amp; communication — www.jsinnovia.com"),
    ]

    soutien_data = [[
        Paragraph(s[0], styles['step_title']),
        Paragraph(s[1], styles['step_body'])
    ] for s in soutiens]

    soutien_t = Table(soutien_data, colWidths=[55*mm, COL_W - 55*mm])
    soutien_t.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0,0), (-1,-1), [colors.HexColor('#0D1020'), colors.HexColor('#111825')]),
        ('BOX', (0,0), (-1,-1), 0.5, GOLD),
        ('INNERGRID', (0,0), (-1,-1), 0.3, colors.HexColor('#1A1A0A')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(soutien_t)

    story.append(PageBreak())
    return story

def build_page5(styles):
    """Page 5 — Contact"""
    story = []
    story.append(Spacer(1, 6*mm))
    story.append(Paragraph("CONTACT &amp; INFORMATIONS", styles['section_title']))
    story.append(HRFlowable(width=COL_W, thickness=1, color=GOLD, spaceAfter=6*mm))

    contacts = [
        ("Organisateur", "ASBL Starlight Dour — BCE 1012.267.056"),
        ("Direction Artistique", "Olivier Trevis"),
        ("Site Officiel", "www.oliviertrevis.be"),
        ("Site FashionistART", "www.fashionistartdour.be"),
        ("Dossier UNESCO en ligne", "www.oliviertrevis.be/unesco"),
        ("Contact email", "contact@fashionistartdour.be"),
        ("Partenaire Digital", "JS-Innov.IA — www.jsinnovia.com"),
    ]

    contact_data = [[
        Paragraph(c[0], styles['contact_label']),
        Paragraph(c[1], styles['contact_val'])
    ] for c in contacts]

    contact_t = Table(contact_data, colWidths=[55*mm, COL_W - 55*mm])
    contact_t.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0,0), (-1,-1), [colors.HexColor('#0D1020'), colors.HexColor('#111825')]),
        ('BOX', (0,0), (-1,-1), 1, GOLD),
        ('INNERGRID', (0,0), (-1,-1), 0.3, colors.HexColor('#1A1A0A')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(contact_t)

    story.append(Spacer(1, 10*mm))
    story.append(HRFlowable(width=COL_W, thickness=1, color=GOLD, spaceAfter=6*mm))

    story.append(Paragraph(
        "FashionistART Dour — Dossier de Candidature UNESCO 2027",
        ParagraphStyle('ft', fontName='Helvetica-Bold', fontSize=10, textColor=GOLD, alignment=TA_CENTER)
    ))
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph(
        "Ce dossier est la propriété de l'ASBL Starlight Dour. Toute reproduction est soumise à autorisation écrite.",
        styles['small']
    ))
    story.append(Spacer(1, 2*mm))
    story.append(Paragraph(
        "Conception &amp; Réalisation digitale : JS-Innov.IA — www.jsinnovia.com",
        styles['small']
    ))

    return story

# ─── MAIN ───────────────────────────────────────────────────────────────────────

def generate(output_path):
    styles = make_styles()

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T + 12*mm,  # +12mm pour la bande gold en haut
        bottomMargin=MARGIN_B + 10*mm,
        title="Dossier UNESCO FashionistART Dour 2027",
        author="ASBL Starlight Dour — JS-Innov.IA",
    )

    story = []
    story += build_cover(styles)
    story += build_page2(styles)
    story += build_page3(styles)
    story += build_page4(styles)
    story += build_page5(styles)

    doc.build(story,
              onFirstPage=draw_cover_background,
              onLaterPages=draw_page_background)

    print(f"PDF généré : {output_path}")
    import os
    print(f"Taille : {os.path.getsize(output_path):,} bytes")

if __name__ == '__main__':
    generate('/tmp/Dossier_UNESCO_FashionistART_2027_v3.pdf')
