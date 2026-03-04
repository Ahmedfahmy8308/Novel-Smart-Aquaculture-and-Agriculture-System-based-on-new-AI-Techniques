import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';

// ────────────────────────────────────────────────────────────────
// Design constants
// ────────────────────────────────────────────────────────────────
const _kTagBg = Color(0xFF1A3D24);
const _kTagBorder = Color(0xFF2A5C2A);
const _kSubtitle = Color(0xFF7A9A7A);
const _kTagText = Color(0xFF7A9A7A);
const _kArrow = Color(0xFF4CAF50);

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        systemNavigationBarColor: Colors.transparent,
        systemNavigationBarDividerColor: Colors.transparent,
        statusBarIconBrightness: Brightness.light,
        systemNavigationBarIconBrightness: Brightness.light,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0A1F10),
      extendBodyBehindAppBar: true,
      extendBody: true,
      body: Stack(
        fit: StackFit.expand,
        children: [
          SizedBox.expand(
            child: Opacity(
              opacity: 0.6,
              child: Image.asset(
                'assets/images/start_background.png',
                fit: BoxFit.cover,
              ),
            ),
          ),
          SingleChildScrollView(
            padding: EdgeInsets.only(
              left: 24,
              right: 24,
              top: MediaQuery.of(context).padding.top,
              bottom: MediaQuery.of(context).padding.bottom + 16,
            ),
            child: ConstrainedBox(
              constraints: BoxConstraints(
                minHeight:
                    MediaQuery.of(context).size.height -
                    MediaQuery.of(context).padding.top -
                    MediaQuery.of(context).padding.bottom -
                    16,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // ── AgroMind logo ──
                  Center(
                    child: Image.asset(
                      'assets/images/start_agromind.png',
                      height: 40,
                    ),
                  ),

                  const SizedBox(height: 28),

                  // ── Welcome text ──
                  Text(
                    'Welcome, Mohamed',
                    style: GoogleFonts.playfairDisplay(
                      fontSize: 35,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                      height: 1.15,
                     
                    ),
                  ),

                  const SizedBox(height: 8),

                  // ── Subtitle ──
                  Text(
                    'System operational. Select a command module to begin.',
                    style: GoogleFonts.dmSans(
                      fontSize: 13,
                      fontWeight: FontWeight.w400,
                      color: _kSubtitle,
                    ),
                  ),

                  const SizedBox(height: 28),

                  // ── Module cards grid ──
                  Row(
                    children: [
                      Expanded(
                        child: _ModuleCard(
                          image: 'assets/images/start_agri.png',
                          title: 'Agriculture',
                          tag: 'CROP YIELD',
                          onTap: () => context.push('/agriculture/crop-health'),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: _ModuleCard(
                          image: 'assets/images/start_aqua.png',
                          title: 'Aquaculture',
                          tag: 'WATER QUALITY',
                          onTap:
                              () => context.push(
                                '/aquaculture/disease-detection',
                              ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 16),

                  Row(
                    children: [
                      Expanded(
                        child: _ModuleCard(
                          image: 'assets/images/start_weather.png',
                          title: 'Weather',
                          tag: 'MICRO-CLIMATE',
                          onTap: () => context.push('/weather/forecast'),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: _ModuleCard(
                          image: 'assets/images/start_energy.png',
                          title: 'Energy',
                          tag: 'MICRO-CLIMATE',
                          onTap: () => context.push('/energy/monitoring'),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 32),

                  // ── Explore Full Platform Dashboard button ──
                  Center(
                    child: GestureDetector(
                      onTap: () {
                        // TODO: navigate to full dashboard
                      },
                      child: Container(
                        width: 296,
                        height: 38,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          gradient: const LinearGradient(
                            colors: [
                              Color(0xFF3A8C2F),
                              Color(0xFF1ABFA1),
                              Color(0xFF4A9FD4),
                              Color(0xFFF5A623),
                            ],
                            stops: [0.0, 0.33, 0.67, 1.0],
                          ),
                        ),
                        padding: const EdgeInsets.all(1), // border width
                        child: Container(
                          decoration: BoxDecoration(
                            color: const Color(0xCF0A1F12),
                            borderRadius: BorderRadius.circular(19),
                          ),
                          padding: const EdgeInsets.only(top: 6, bottom: 8),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.grid_view_rounded,
                                color: Colors.white.withValues(alpha: 0.9),
                                size: 16,
                              ),
                              const SizedBox(width: 8),
                              Text(
                                'Explore Full Platform Dashboard',
                                style: GoogleFonts.dmSans(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.white.withValues(alpha: 0.9),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ────────────────────────────────────────────────────────────────
// Module Card Widget
// ────────────────────────────────────────────────────────────────
class _ModuleCard extends StatelessWidget {
  const _ModuleCard({
    required this.image,
    required this.title,
    required this.tag,
    required this.onTap,
  });

  final String image;
  final String title;
  final String tag;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            stops: [0.0, 0.1923, 1.0],
            colors: [
              Color(0x3075A68E), // rgba(117,166,142,0.19)
              Color(0x5C285C42), // rgba(40,92,66,0.36)
              Color(0xFF0F2319), // #0F2319
            ],
          ),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Color(0x333A8C2F), width: 1),
        ),
        padding: const EdgeInsets.all(10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ── Card image ──
            ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: AspectRatio(
                aspectRatio: 1.4,
                child: Image.asset(
                  image,
                  fit: BoxFit.cover,
                  width: double.infinity,
                ),
              ),
            ),

            const SizedBox(height: 10),

            // ── Title ──
            Text(
              title,
              style: GoogleFonts.dmSans(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),

            const SizedBox(height: 8),

            // ── Tag + Arrow row ──
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: _kTagBg,
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: _kTagBorder, width: 0.5),
                  ),
                  child: Text(
                    tag,
                    style: GoogleFonts.dmSans(
                      fontSize: 8,
                      fontWeight: FontWeight.w600,
                      color: _kTagText,
                      letterSpacing: 0.8,
                    ),
                  ),
                ),
                const Spacer(),
                Icon(Icons.arrow_forward, color: _kArrow, size: 18),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
