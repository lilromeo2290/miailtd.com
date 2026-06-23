#!/usr/bin/env python3
"""
Rebrand Miai Ltd website from navy/orange to pink/purple based on logo colors.
Logo primary: #fd0099 (hot pink), Logo secondary: #9e21ef (purple)
"""
import re, os

BASE = '/home/z/my-project/src/components/website'
GLOBAL_CSS = '/home/z/my-project/src/app/globals.css'
LAYOUT = '/home/z/my-project/src/app/layout.tsx'

# ────────────────────────────────────────
# 1. Update globals.css
# ────────────────────────────────────────
with open(GLOBAL_CSS, 'r') as f:
    css = f.read()

# Update @theme inline color definitions
replacements_theme = [
    ('--color-navy: #0f1b2d;',            '--color-navy: #0d0517;'),
    ('--color-navy-light: #1a2d47;',       '--color-navy-light: #1a1030;'),
    ('--color-navy-dark: #0a1220;',        '--color-navy-dark: #080310;'),
    ('--color-safety-orange: #f97316;',    '--color-safety-orange: #fd0099;'),
    ('--color-safety-orange-dark: #ea580c;','--color-safety-orange-dark: #d4007e;'),
    ('--color-safety-yellow: #eab308;',    '--color-safety-yellow: #9e21ef;'),
    ('--color-steel-grey: #6b7280;',       '--color-steel-grey: #7a7590;'),
    ('--color-light-grey: #f3f4f6;',       '--color-light-grey: #f5f0f8;'),
    ('--color-concrete: #e5e7eb;',         '--color-concrete: #e8e0f0;'),
]

for old, new in replacements_theme:
    css = css.replace(old, new)

# Update :root CSS variables
replacements_root = [
    ('--foreground: #0f1b2d;',            '--foreground: #0d0517;'),
    ('--card-foreground: #0f1b2d;',       '--card-foreground: #0d0517;'),
    ('--popover-foreground: #0f1b2d;',    '--popover-foreground: #0d0517;'),
    ('--primary: #0f1b2d;',               '--primary: #fd0099;'),
    ('--primary-foreground: #ffffff;',    '--primary-foreground: #ffffff;'),
    ('--secondary: #f3f4f6;',             '--secondary: #f5f0f8;'),
    ('--secondary-foreground: #0f1b2d;',  '--secondary-foreground: #0d0517;'),
    ('--muted: #f3f4f6;',                 '--muted: #f5f0f8;'),
    ('--muted-foreground: #6b7280;',      '--muted-foreground: #7a7590;'),
    ('--accent: #f97316;',                '--accent: #9e21ef;'),
    ('--border: #e5e7eb;',                '--border: #e8e0f0;'),
    ('--input: #e5e7eb;',                 '--input: #e8e0f0;'),
    ('--ring: #f97316;',                  '--ring: #fd0099;'),
    ('--chart-1: #f97316;',               '--chart-1: #fd0099;'),
    ('--chart-2: #0f1b2d;',               '--chart-2: #0d0517;'),
    ('--chart-3: #1a2d47;',               '--chart-3: #9e21ef;'),
    ('--chart-4: #6b7280;',               '--chart-4: #7a7590;'),
    ('--chart-5: #eab308;',               '--chart-5: #ff66cc;'),
    ('--sidebar: #0f1b2d;',               '--sidebar: #0d0517;'),
    ('--sidebar-primary: #f97316;',       '--sidebar-primary: #fd0099;'),
    ('--sidebar-accent: #1a2d47;',        '--sidebar-accent: #1a1030;'),
    ('--sidebar-ring: #f97316;',          '--sidebar-ring: #fd0099;'),
]

for old, new in replacements_root:
    css = css.replace(old, new)

# Update hardcoded hex values in CSS classes
replacements_hardcoded = [
    ('background: #f3f4f6;',              'background: #f5f0f8;'),
    ('background: #6b7280;',              'background: #7a7590;'),
    ('background: #0f1b2d;',              'background: #0d0517;'),
    ('rgba(15,27,45,0.92)',               'rgba(13,5,23,0.92)'),
    ('rgba(15,27,45,0.7)',                'rgba(13,5,23,0.7)'),
    ('rgba(15,27,45,0.85)',               'rgba(13,5,23,0.85)'),
    ('rgba(15,27,45,0.15)',               'rgba(13,5,23,0.15)'),
    ('rgba(15,27,45,0.5)',                'rgba(13,5,23,0.5)'),
    ('#f97316, #eab308, #f97316',         '#fd0099, #9e21ef, #fd0099'),
    ('rgba(249,115,22,0.03)',             'rgba(253,0,153,0.03)'),
    ('#f97316 0%, #ea580c 100%',          '#fd0099 0%, #d4007e 100%'),
    ('#ea580c 0%, #c2410c 100%',          '#d4007e 0%, #b00068 100%'),
    ('rgba(249,115,22,0.4)',              'rgba(253,0,153,0.4)'),
    ('rgba(15,27,45,0.5)',                'rgba(13,5,23,0.5)'),
]

for old, new in replacements_hardcoded:
    css = css.replace(old, new)

# Update hero-overlay gradient
css = css.replace(
    'background: linear-gradient(135deg, rgba(13,5,23,0.92) 0%, rgba(13,5,23,0.7) 50%, rgba(13,5,23,0.85) 100%);',
    'background: linear-gradient(135deg, rgba(13,5,23,0.93) 0%, rgba(13,5,23,0.75) 50%, rgba(13,5,23,0.88) 100%);'
)

with open(GLOBAL_CSS, 'w') as f:
    f.write(css)

print(f'✓ Updated {GLOBAL_CSS}')

# ────────────────────────────────────────
# 2. Update Header.tsx - Replace logo icon with actual logo image
# ────────────────────────────────────────
header_path = os.path.join(BASE, 'Header.tsx')
with open(header_path, 'r') as f:
    header = f.read()

# Remove HardHat import if it's only used for the logo
# Replace the logo section
old_logo_header = '''<button onClick={() => handleNav('home')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-navy rounded-lg flex items-center justify-center group-hover:bg-safety-orange transition-colors">
                <HardHat className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg lg:text-xl font-bold text-navy leading-tight">Miai Ltd</div>
                <div className="text-[10px] lg:text-xs text-steel-grey tracking-wider uppercase">Company</div>
              </div>
            </button>'''

new_logo_header = '''<button onClick={() => handleNav('home')} className="flex items-center gap-3 group">
              <img
                src="/logo.jpg"
                alt="Miai Ltd"
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain rounded-lg"
              />
              <div className="hidden sm:block">
                <div className="text-lg lg:text-xl font-bold text-navy leading-tight">Miai Ltd</div>
                <div className="text-[10px] lg:text-xs text-steel-grey tracking-wider uppercase">Company</div>
              </div>
            </button>'''

header = header.replace(old_logo_header, new_logo_header)

# Remove HardHat from import if only used in logo
if 'HardHat' not in header.split('old_logo_header')[0] if 'old_logo_header' in header else 'HardHat' in header.replace(new_logo_header, ''):
    # Check if HardHat is still used elsewhere
    if header.count('HardHat') <= 1:
        header = header.replace("HardHat, ", "")

with open(header_path, 'w') as f:
    f.write(header)

print(f'✓ Updated {header_path}')

# ────────────────────────────────────────
# 3. Update Footer.tsx - Replace logo icon with actual logo image
# ────────────────────────────────────────
footer_path = os.path.join(BASE, 'Footer.tsx')
with open(footer_path, 'r') as f:
    footer = f.read()

old_logo_footer = '''<div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-safety-orange rounded-lg flex items-center justify-center">
                <HardHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-white leading-tight">Miai Ltd</div>
                <div className="text-[10px] text-white/50 tracking-wider uppercase">Company</div>
              </div>
            </div>'''

new_logo_footer = '''<div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.jpg"
                alt="Miai Ltd"
                className="w-10 h-10 object-contain rounded-lg brightness-0 invert"
              />
              <div>
                <div className="text-lg font-bold text-white leading-tight">Miai Ltd</div>
                <div className="text-[10px] text-white/50 tracking-wider uppercase">Company</div>
              </div>
            </div>'''

footer = footer.replace(old_logo_footer, new_logo_footer)

# Remove HardHat from import if no longer used
if footer.count('HardHat') <= 1:
    footer = footer.replace("HardHat, ", "")

with open(footer_path, 'w') as f:
    f.write(footer)

print(f'✓ Updated {footer_path}')

# ────────────────────────────────────────
# 4. Update HeroSection.tsx - Change gradient text color
# ────────────────────────────────────────
hero_path = os.path.join(BASE, 'HeroSection.tsx')
with open(hero_path, 'r') as f:
    hero = f.read()

# Change "from-safety-orange to-amber-400" to "from-[#fd0099] to-[#9e21ef]"
hero = hero.replace(
    'from-safety-orange to-amber-400',
    'from-[#fd0099] to-[#9e21ef]'
)

with open(hero_path, 'w') as f:
    f.write(hero)

print(f'✓ Updated {hero_path}')

# ────────────────────────────────────────
# 5. Update HomeCTASection.tsx - Change gradient
# ────────────────────────────────────────
cta_path = os.path.join(BASE, 'HomeCTASection.tsx')
with open(cta_path, 'r') as f:
    cta = f.read()

cta = cta.replace(
    'from-safety-orange via-safety-orange-dark to-orange-700',
    'from-[#fd0099] via-[#d4007e] to-[#9e21ef]'
)

# Update the button text color
cta = cta.replace(
    'text-safety-orange-dark hover:bg-white/90',
    'text-[#d4007e] hover:bg-white/90'
)
cta = cta.replace(
    'text-safety-orange-dark',
    'text-[#9e21ef]'
)

with open(cta_path, 'w') as f:
    f.write(cta)

print(f'✓ Updated {cta_path}')

# ────────────────────────────────────────
# 6. Update AboutSection.tsx - Replace HardHat placeholder with logo
# ────────────────────────────────────────
about_path = os.path.join(BASE, 'AboutSection.tsx')
with open(about_path, 'r') as f:
    about = f.read()

about = about.replace(
    '''<HardHat className="w-16 h-16 text-safety-orange mx-auto mb-4" />
                  <p className="text-white/60 text-sm">Company photo — 25+ years of excellence</p>''',
    '''<img src="/logo.jpg" alt="Miai Ltd" className="w-24 h-24 object-contain mx-auto mb-4 brightness-0 invert" />
                  <p className="text-white/60 text-sm">25+ years of excellence</p>'''
)

# Remove HardHat from import if no longer used
if about.count('HardHat') <= 1:
    about = about.replace("HardHat, ", "")

with open(about_path, 'w') as f:
    f.write(about)

print(f'✓ Updated {about_path}')

# ────────────────────────────────────────
# 7. Update layout.tsx - Update favicon reference
# ────────────────────────────────────────
# No changes needed to layout.tsx for colors

print('\n✅ Rebranding complete! New palette:')
print('  Primary (Pink):   #fd0099 (was navy/orange)')
print('  Secondary (Purple): #9e21ef (was safety-yellow)')
print('  Dark BG:           #0d0517 (was #0f1b2d)')
print('  Dark Light:        #1a1030 (was #1a2d47)')
print('  Darker:            #080310 (was #0a1220)')
print('  Muted text:        #7a7590 (was #6b7280)')
print('  Light surface:     #f5f0f8 (was #f3f4f6)')
print('  Border:            #e8e0f0 (was #e5e7eb)')