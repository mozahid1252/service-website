#!/usr/bin/env python3
"""
Generate public/pdfs/core-packages.pdf — a combined details PDF for all
4 Core E-Commerce Packages (Health Check, Growth Package, Advanced Package,
Analytics Partner Retainer).

Design matches the website's dark premium aesthetic:
near-black background, cyan (#00C6FF) accents, white body text.

Run: python3 scripts/generate-core-packages-pdf.py
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
    Table, TableStyle, KeepTogether, PageBreak
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER

# ── Colors (match website) ──
BG = HexColor('#060912')        # page background (near-black)
CARD_BG = HexColor('#0D1520')   # card background
CYAN = HexColor('#00C6FF')      # primary accent
CYAN_DIM = HexColor('#0096CC')  # dimmer cyan for labels
GREEN = HexColor('#00E676')     # success / checkmarks
WHITE = HexColor('#FFFFFF')
TEXT = HexColor('#E8EDF2')      # body text
TEXT_DIM = HexColor('#8899AA')   # dim text
BORDER = HexColor('#1A2330')    # card border
GOLD = HexColor('#F5A623')      # price gold

# ── Font registration (use system fonts; fall back to Helvetica) ──
def register_fonts():
    candidates = {
        'Inter': [
            '/usr/share/fonts/truetype/inter/Inter-Regular.ttf',
            '/usr/share/fonts/Inter-Regular.ttf',
        ],
        'Inter-Bold': [
            '/usr/share/fonts/truetype/inter/Inter-Bold.ttf',
            '/usr/share/fonts/Inter-Bold.ttf',
        ],
        'Inter-Black': [
            '/usr/share/fonts/truetype/inter/Inter-Black.ttf',
            '/usr/share/fonts/Inter-Black.ttf',
        ],
    }
    registered = {}
    for name, paths in candidates.items():
        for p in paths:
            if os.path.exists(p):
                try:
                    pdfmetrics.registerFont(TTFont(name, p))
                    registered[name] = True
                    break
                except Exception:
                    pass
    return registered

FONTS = register_fonts()
SANS = 'Inter' if FONTS.get('Inter') else 'Helvetica'
SANS_BOLD = 'Inter-Bold' if FONTS.get('Inter-Bold') else 'Helvetica-Bold'
SANS_BLACK = 'Inter-Black' if FONTS.get('Inter-Black') else 'Helvetica-Bold'

# ── Package data (mirrors CORE_PACKAGES in src/app/page.tsx) ──
CORE_PACKAGES = [
    {
        'tag': 'STOP THE BLEED.',
        'name': 'E-Commerce Health Check',
        'tier': 'STARTER',
        'price': '$150 – $300',
        'timeline': 'One-time · 5–7 day delivery',
        'description': 'A 90-day forensic audit across sales, funnel, customers, and true product profitability.',
        'features': [
            '4 focused analyses (Sales, Funnel, Customers, Profit)',
            'Executive Summary PDF (2-3 pages)',
            'Visual Dashboard (Looker Studio / Power BI)',
            'Action Priority List (This week / Month / Later)',
            '30-min Video Walkthrough',
            '1 Round of Revision',
        ],
        'bestFor': 'Stores doing $5K+/mo',
        'promise': 'After this package, you will know exactly where your store is losing potential revenue, which products are actually making you money, and the top 3 things to fix this week to see measurable results.',
        'cta': 'Book the Health Check',
        'featured': False,
    },
    {
        'tag': 'SCALE WHAT WORKS.',
        'name': 'Revenue Growth Accelerator',
        'tier': 'GROWTH',
        'price': '$600 – $1,200',
        'timeline': 'One-time · 10–14 day delivery',
        'description': 'Full RFM, channel LTV:CAC, cohort truth, bundle strategy, and an interactive intelligence dashboard.',
        'features': [
            'Everything in Starter, plus 5 deeper analyses',
            'Full 8-segment RFM Customer Segmentation',
            'Channel LTV:CAC & Marketing Audit',
            'Cross-sell & Bundle Opportunity Analysis',
            'Interactive Dashboard + Klaviyo-ready CSV',
            '60-min Strategy Call + 30-day Roadmap',
        ],
        'bestFor': 'Stores doing $10K+/mo',
        'promise': 'After this package, you will know exactly which customers to focus on (and what to say to each group), which marketing channels are wasting your money, and how to implement product bundles that immediately increase your average order value.',
        'cta': 'Book the Growth Package',
        'featured': True,
    },
    {
        'tag': 'LIVE IN THE DATA.',
        'name': 'Data-Driven Growth System',
        'tier': 'ADVANCED',
        'price': '$2,000 – $4,000',
        'timeline': 'One-time · 20–30 day delivery',
        'description': 'Your complete analytics engine, built once, runs forever. 15 total analyses including cohorts, forecasts, and live dashboards.',
        'features': [
            'Everything in Growth, plus 6 advanced analyses',
            'Complete Cohort Analysis & 90-Day Sales Forecast',
            'Profit Margin Deep Dive (True per-product profit)',
            'Live Custom KPI Dashboard (Auto-refreshing)',
            'Discount & Return Pattern Analysis',
            '90-min Strategy Session + 60-day Email Support',
        ],
        'bestFor': 'Stores doing $50K+/mo',
        'promise': 'After this package, you will never make a major business decision without data to back it up. You will know your most valuable customers, most profitable products, and have a live dashboard that gives you your business pulse in under 5 minutes each morning.',
        'cta': 'Apply for Advanced',
        'featured': False,
    },
    {
        'tag': 'NEVER GO STALE.',
        'name': 'Analytics Partner Retainer',
        'tier': 'RETAINER',
        'price': '$500 – $1,200 /mo',
        'timeline': 'Ongoing (Min. 2-month commitment)',
        'description': 'Your dedicated data analyst. A 4-week rhythm that keeps your business moving forward with continuous insight.',
        'features': [
            'Monthly Performance & Customer Health Reports',
            'Marketing Efficiency Review & Forward Planning',
            '4 Ad-hoc Analyses per month',
            '48-hr Email / Slack response',
            'Proactive Anomaly Alerts',
            'Dashboard Maintenance & 45-min Monthly Call',
        ],
        'bestFor': 'Stores doing $100K+/mo needing a permanent data partner.',
        'promise': "With this retainer, today's insight will never become outdated next month. We will detect problems between analyses before they cost you money, ensure your implemented changes are actually working, and keep you prepared for seasonal shifts before they catch you off guard.",
        'cta': 'Become a Retainer Client',
        'featured': False,
    },
]

# ── Page geometry ──
PAGE_W, PAGE_H = A4
MARGIN = 18 * mm
CONTENT_W = PAGE_W - 2 * MARGIN

# ── Paragraph styles ──
def make_styles():
    return {
        'cover_eyebrow': ParagraphStyle('cover_eyebrow', fontName=SANS_BOLD, fontSize=9,
            textColor=CYAN, alignment=TA_CENTER, spaceAfter=8, leading=12),
        'cover_title': ParagraphStyle('cover_title', fontName=SANS_BLACK, fontSize=30,
            textColor=WHITE, alignment=TA_CENTER, leading=36, spaceAfter=10),
        'cover_subtitle': ParagraphStyle('cover_subtitle', fontName=SANS, fontSize=12,
            textColor=TEXT_DIM, alignment=TA_CENTER, leading=18, spaceAfter=20),
        'cover_meta': ParagraphStyle('cover_meta', fontName=SANS_BOLD, fontSize=9,
            textColor=CYAN_DIM, alignment=TA_CENTER, leading=14),
        'pkg_tag': ParagraphStyle('pkg_tag', fontName=SANS_BOLD, fontSize=8,
            textColor=CYAN, leading=12, spaceAfter=4),
        'pkg_name': ParagraphStyle('pkg_name', fontName=SANS_BLACK, fontSize=15,
            textColor=WHITE, leading=20, spaceAfter=2),
        'pkg_tier': ParagraphStyle('pkg_tier', fontName=SANS_BOLD, fontSize=7,
            textColor=TEXT_DIM, leading=10, spaceAfter=8),
        'pkg_price': ParagraphStyle('pkg_price', fontName=SANS_BLACK, fontSize=16,
            textColor=GOLD, leading=20, spaceAfter=2),
        'pkg_timeline': ParagraphStyle('pkg_timeline', fontName=SANS, fontSize=9,
            textColor=TEXT_DIM, leading=12, spaceAfter=8),
        'pkg_desc': ParagraphStyle('pkg_desc', fontName=SANS, fontSize=10,
            textColor=TEXT, leading=15, spaceAfter=8),
        'label': ParagraphStyle('label', fontName=SANS_BOLD, fontSize=8,
            textColor=CYAN, leading=11, spaceAfter=3),
        'body': ParagraphStyle('body', fontName=SANS, fontSize=9.5,
            textColor=TEXT, leading=14, spaceAfter=4),
        'feature': ParagraphStyle('feature', fontName=SANS, fontSize=9.5,
            textColor=TEXT, leading=14, leftIndent=2),
        'promise': ParagraphStyle('promise', fontName=SANS, fontSize=9.5,
            textColor=WHITE, leading=14),
        'cta': ParagraphStyle('cta', fontName=SANS_BOLD, fontSize=9,
            textColor=CYAN, leading=12, alignment=TA_LEFT),
        'section_label': ParagraphStyle('section_label', fontName=SANS_BOLD, fontSize=9,
            textColor=CYAN, alignment=TA_CENTER, leading=12, spaceAfter=4),
        'section_title': ParagraphStyle('section_title', fontName=SANS_BLACK, fontSize=20,
            textColor=WHITE, alignment=TA_CENTER, leading=26, spaceAfter=8),
        'section_sub': ParagraphStyle('section_sub', fontName=SANS, fontSize=11,
            textColor=TEXT_DIM, alignment=TA_CENTER, leading=16, spaceAfter=14),
    }

S = make_styles()

def esc(t):
    return (t or '').replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

# ── Page background painter (dark fill on every page) ──
def paint_background(canv, doc):
    canv.saveState()
    canv.setFillColor(BG)
    canv.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # Top accent bar
    canv.setFillColor(CYAN)
    canv.rect(0, PAGE_H - 3, PAGE_W, 3, fill=1, stroke=0)
    # Footer page number
    canv.setFillColor(TEXT_DIM)
    canv.setFont(SANS, 8)
    canv.drawCentredString(PAGE_W / 2, 10 * mm, f'{doc.page} / {getattr(doc, "_total_pages", "?")}')
    # Footer brand
    canv.setFillColor(CYAN_DIM)
    canv.setFont(SANS_BOLD, 7)
    canv.drawString(MARGIN, 10 * mm, 'MOZAHIDUL ISLAM  ·  E-COMMERCE GROWTH ANALYST')
    canv.restoreState()

def paint_cover(canv, doc):
    paint_background(canv, doc)
    # Decorative cyan radial-ish glow (simple circles)
    canv.saveState()
    canv.setFillColor(HexColor('#0A1420'))
    canv.circle(PAGE_W / 2, PAGE_H * 0.62, 90 * mm, fill=1, stroke=0)
    canv.restoreState()

# ── Build a package card as a Table flowable ──
def build_package_card(pkg, index):
    """Return a list of flowables for one package (kept together)."""
    flow = []
    # Header row: tag + tier badge
    header_data = [[
        Paragraph(esc(pkg['tag']), S['pkg_tag']),
        Paragraph(esc(pkg['tier']), ParagraphStyle('tier_r', fontName=SANS_BOLD, fontSize=7,
            textColor=TEXT_DIM, alignment=2, leading=10)),  # right aligned
    ]]
    header_tbl = Table(header_data, colWidths=[CONTENT_W * 0.7, CONTENT_W * 0.3])
    header_tbl.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))

    # Name + price row
    name_price = [[
        Paragraph(esc(pkg['name']), S['pkg_name']),
        Paragraph(esc(pkg['price']), ParagraphStyle('price_r', fontName=SANS_BLACK, fontSize=16,
            textColor=GOLD, alignment=2, leading=20)),
    ]]
    name_price_tbl = Table(name_price, colWidths=[CONTENT_W * 0.6, CONTENT_W * 0.4])
    name_price_tbl.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'BOTTOM'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))

    flow.append(header_tbl)
    flow.append(name_price_tbl)
    flow.append(Paragraph(esc(pkg['timeline']), S['pkg_timeline']))
    flow.append(Paragraph(esc(pkg['description']), S['pkg_desc']))

    # Features list (checkmarks)
    flow.append(Paragraph('WHAT&#8217;S INCLUDED', S['label']))
    feat_paras = [[Paragraph(f'<font color="#00E676">&#10003;</font>&nbsp;&nbsp;{esc(f)}', S['feature'])] for f in pkg['features']]
    feat_tbl = Table(feat_paras, colWidths=[CONTENT_W])
    feat_tbl.setStyle(TableStyle([
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    flow.append(feat_tbl)
    flow.append(Spacer(1, 6))

    # Best For
    flow.append(Paragraph('BEST FOR', S['label']))
    flow.append(Paragraph(esc(pkg['bestFor']), S['body']))

    # Our Promise (in a tinted box)
    flow.append(Spacer(1, 4))
    promise_inner = [
        [Paragraph('OUR PROMISE TO YOU', S['label'])],
        [Paragraph(esc(pkg['promise']), S['promise'])],
    ]
    promise_tbl = Table(promise_inner, colWidths=[CONTENT_W - 16])
    promise_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), HexColor('#0A1A24')),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('LINEBEFORE', (0,0), (0,-1), 2, CYAN),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
    ]))
    flow.append(promise_tbl)
    flow.append(Spacer(1, 6))

    # CTA
    flow.append(Paragraph(f'<font color="#00C6FF">&#8594;</font>&nbsp;&nbsp;{esc(pkg["cta"])}', S['cta']))

    # Wrap everything in an outer card table with border
    inner = [[f] for f in flow]
    # We can't easily nest flowables in a Table cell without a nested approach;
    # instead wrap the whole block as a single-cell Table containing a list.
    # ReportLab Table cells accept a list of flowables.
    card = Table([[flow]], colWidths=[CONTENT_W])
    card.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.75, BORDER),
        ('LINEABOVE', (0,0), (-1,0), 2, CYAN),
        ('LEFTPADDING', (0,0), (-1,-1), 18),
        ('RIGHTPADDING', (0,0), (-1,-1), 18),
        ('TOPPADDING', (0,0), (-1,-1), 16),
        ('BOTTOMPADDING', (0,0), (-1,-1), 16),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    return [KeepTogether([card, Spacer(1, 14)])]

def build_cover():
    flow = []
    flow.append(Spacer(1, 70 * mm))
    flow.append(Paragraph('E-COMMERCE ANALYTICS', S['cover_eyebrow']))
    flow.append(Paragraph('Core E-Commerce<br/>Packages', S['cover_title']))
    flow.append(Paragraph('Three tiers, one retainer. Designed to meet your store<br/>wherever it is today.', S['cover_subtitle']))
    flow.append(Spacer(1, 12))
    flow.append(Paragraph('4 PACKAGES &nbsp;&nbsp;·&nbsp;&nbsp; $150 – $2,500 &nbsp;&nbsp;·&nbsp;&nbsp; 5–30 DAY DELIVERY', S['cover_meta']))
    flow.append(PageBreak())
    return flow

def build_intro():
    flow = []
    flow.append(Spacer(1, 6 * mm))
    flow.append(Paragraph('SERVICE DETAILS', S['section_label']))
    flow.append(Paragraph('Core E-Commerce Packages', S['section_title']))
    flow.append(Paragraph('Complete details for all four engagement tiers — pricing, scope, deliverables, and the promise behind each package.', S['section_sub']))
    flow.append(Spacer(1, 4 * mm))
    return flow

def main():
    out = os.path.join(os.path.dirname(__file__), '..', 'public', 'pdfs', 'core-packages.pdf')
    out = os.path.abspath(out)

    doc = BaseDocTemplate(out, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN, bottomMargin=16 * mm,
        title='Core E-Commerce Packages Details',
        author='Mozahidul Islam',
        subject='Core E-Commerce Packages — Health Check, Growth, Advanced, Retainer',
        creator='Mozahidul Islam Portfolio')

    cover_frame = Frame(MARGIN, 16*mm, CONTENT_W, PAGE_H - MARGIN - 16*mm, id='cover')
    body_frame = Frame(MARGIN, 16*mm, CONTENT_W, PAGE_H - MARGIN - 16*mm, id='body')
    doc.addPageTemplates([
        PageTemplate(id='Cover', frames=[cover_frame], onPage=paint_cover),
        PageTemplate(id='Body', frames=[body_frame], onPage=paint_background),
    ])

    story = []
    story.extend(build_cover())
    story.extend(build_intro())
    # Switch to Body template for the package pages
    from reportlab.platypus.doctemplate import NextPageTemplate
    story.insert(0, NextPageTemplate('Cover'))
    story.append(NextPageTemplate('Body'))

    for i, pkg in enumerate(CORE_PACKAGES):
        story.extend(build_package_card(pkg, i))

    # Set total pages placeholder (simple approach: leave as "?" — page numbers still show)
    doc._total_pages = '?'
    doc.build(story)

    size = os.path.getsize(out)
    print(f'✓ Generated {out}')
    print(f'  size: {size:,} bytes ({size/1024:.1f} KB)')

if __name__ == '__main__':
    main()
