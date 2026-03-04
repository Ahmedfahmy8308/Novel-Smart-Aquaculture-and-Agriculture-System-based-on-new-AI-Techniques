import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';

// ──────────────────────────────────────────────
// Data model for one onboarding page
// ──────────────────────────────────────────────
class _OnboardingData {
  final String background;
  final IconData icon;
  final Color iconColor;
  final String badge;
  final String title;
  final String description;

  const _OnboardingData({
    required this.background,
    required this.icon,
    required this.iconColor,
    required this.badge,
    required this.title,
    required this.description,
  });
}

const List<_OnboardingData> _pages = [
  _OnboardingData(
    background: 'assets/images/Plants.png',
    icon: Icons.eco,
    iconColor: Color(0xFF3A8C2F),
    badge: '28 AI Models',
    title: 'Agriculture Intelligence',
    description:
        'Crop disease detection, yield prediction, soil analysis powered by computer vision.',
  ),
  _OnboardingData(
    background: 'assets/images/sea.png',
    icon: FontAwesomeIcons.fish,
    iconColor: Color(0xFF26C6DA),
    badge: '38 AI Models',
    title: 'Aquaculture Intelligence',
    description:
        'Real-time monitoring of water quality, fish health, and pond ecosystems with precision AI.',
  ),
  _OnboardingData(
    background: 'assets/images/weather.png',
    icon: Icons.cloud,
    iconColor: Color(0xFFFFB300),
    badge: '22 AI Models',
    title: 'Weather & Environment',
    description:
        'Hyper-local forecasting and climate risk models for optimal farm decision-making.',
  ),
  _OnboardingData(
    background: 'assets/images/energy.png',
    icon: Icons.bolt,
    iconColor: Color(0xCC714836),
    badge: '18 AI Models',
    title: 'Energy & Resource Optimization',
    description:
        'Monitor and optimize energy consumption across your farm with intelligent automation.',
  ),
  _OnboardingData(
    background: 'assets/images/llm.png',
    icon: Icons.smart_toy,
    iconColor: Color(0xFF7E57C2),
    badge: '4 AI Models',
    title: 'LLM Cognitive Layer',
    description:
        'Multilingual AI advisors with RAG evidence-based recommendations for every farmer.',
  ),
];

// ──────────────────────────────────────────────
// Onboarding Screen
// ──────────────────────────────────────────────
class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen>
    with TickerProviderStateMixin {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  // Slide-button state
  double _dragOffset = 0;
  bool _isSliding = false;

  // Button track constraints
  static const double _buttonSize = 56;
  static const double _trackHeight = 64;
  static const double _trackPadding = 4;

  void _nextPage() {
    if (_currentPage < _pages.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeInOut,
      );
    } else {
      // After onboarding, send users to registration before login
      context.go('/signup');
    }
  }

  void _onDragUpdate(DragUpdateDetails details, double trackWidth) {
    final maxOffset = trackWidth - _buttonSize - _trackPadding * 2;
    setState(() {
      _dragOffset = (_dragOffset + details.delta.dx).clamp(0.0, maxOffset);
      _isSliding = true;
    });
  }

  void _onDragEnd(DragEndDetails details, double trackWidth) {
    final maxOffset = trackWidth - _buttonSize - _trackPadding * 2;
    if (_dragOffset >= maxOffset * 0.75) {
      // Threshold reached → advance
      setState(() => _dragOffset = maxOffset);
      Future.delayed(const Duration(milliseconds: 200), () {
        if (mounted) {
          setState(() {
            _dragOffset = 0;
            _isSliding = false;
          });
          _nextPage();
        }
      });
    } else {
      // Snap back
      setState(() {
        _dragOffset = 0;
        _isSliding = false;
      });
    }
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // ── PageView of backgrounds + cards ──
          PageView.builder(
            controller: _pageController,
            physics:
                const NeverScrollableScrollPhysics(), // slide button navigates
            onPageChanged: (i) => setState(() => _currentPage = i),
            itemCount: _pages.length,
            itemBuilder:
                (context, index) => _OnboardingPage(data: _pages[index]),
          ),

          // ── AgroMind logo — Figma: top:88, left:62, w:283, h:227 ──
          Positioned(
            top: 88,
            left: 62,
            width: 283,
            height: 227,
            child: Image.asset(
              'assets/images/agromind.png',
              fit: BoxFit.contain,
              alignment: Alignment.center,
            ),
          ),

          // ── Fixed overlay: dots + slide button ──
          SafeArea(
            child: Column(
              children: [
                const Spacer(),

                // ── Page indicator dots ──
                Padding(
                  padding: const EdgeInsets.only(bottom: 20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      _pages.length,
                      (i) => AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        width: i == _currentPage ? 24 : 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color:
                              i == _currentPage
                                  ? _pages[_currentPage].iconColor
                                  : Colors.white.withValues(alpha: 0.4),
                          borderRadius: BorderRadius.circular(4),
                        ),
                      ),
                    ),
                  ),
                ),

                // ── Bottom row: back arrow + slide track ──
                Padding(
                  padding: const EdgeInsets.fromLTRB(24, 0, 24, 32),
                  child: Row(
                    children: [
                      // Back arrow — visible on pages 1-4
                      AnimatedOpacity(
                        opacity: _currentPage > 0 ? 1.0 : 0.0,
                        duration: const Duration(milliseconds: 250),
                        child: GestureDetector(
                          onTap:
                              _currentPage > 0
                                  ? () {
                                    _pageController.previousPage(
                                      duration: const Duration(
                                        milliseconds: 400,
                                      ),
                                      curve: Curves.easeInOut,
                                    );
                                  }
                                  : null,
                          child: Container(
                            width: _buttonSize,
                            height: _buttonSize,
                            margin: const EdgeInsets.only(right: 12),

                            child: const Icon(
                              Icons.chevron_left_rounded,
                              color: Colors.white,
                              size: 30,
                            ),
                          ),
                        ),
                      ),

                      // Slide track
                      Expanded(
                        child: LayoutBuilder(
                          builder: (context, constraints) {
                            final trackWidth = constraints.maxWidth;
                            final maxOffset =
                                trackWidth - _buttonSize - _trackPadding * 2;
                            final accentColor = _pages[_currentPage].iconColor;

                            return Container(
                              height: _trackHeight,
                              decoration: BoxDecoration(
                                color: Colors.white.withValues(alpha: 0.12),
                                borderRadius: BorderRadius.circular(
                                  _trackHeight / 2,
                                ),
                                border: Border.all(
                                  color: Colors.white.withValues(alpha: 0.2),
                                  width: 1,
                                ),
                              ),
                              child: Stack(
                                alignment: Alignment.centerLeft,
                                children: [
                                  // Label fades as button slides
                                  Positioned.fill(
                                    child: Align(
                                      alignment: Alignment.center,
                                      child: Opacity(
                                        opacity: (1 - (_dragOffset / maxOffset))
                                            .clamp(0.0, 1.0),
                                        child: Text(
                                          _currentPage == _pages.length - 1
                                              ? 'Swipe to get started  →'
                                              : 'Swipe to continue  →',
                                          style: TextStyle(
                                            color: Colors.white.withValues(
                                              alpha: 0.7,
                                            ),
                                            fontSize: 14,
                                            fontWeight: FontWeight.w500,
                                            letterSpacing: 0.5,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),

                                  // Draggable arrow button
                                  AnimatedPositioned(
                                    duration:
                                        _isSliding
                                            ? Duration.zero
                                            : const Duration(milliseconds: 300),
                                    curve: Curves.easeOut,
                                    left: _trackPadding + _dragOffset,
                                    child: GestureDetector(
                                      onHorizontalDragUpdate:
                                          (d) => _onDragUpdate(d, trackWidth),
                                      onHorizontalDragEnd:
                                          (d) => _onDragEnd(d, trackWidth),
                                      child: Container(
                                        width: _buttonSize,
                                        height: _buttonSize,
                                        decoration: BoxDecoration(
                                          shape: BoxShape.circle,
                                          color: accentColor,
                                          boxShadow: [
                                            BoxShadow(
                                              color: accentColor.withValues(
                                                alpha: 0.4,
                                              ),
                                              blurRadius: 12,
                                              spreadRadius: 2,
                                            ),
                                          ],
                                        ),
                                        child: const Icon(
                                          Icons.arrow_forward_rounded,
                                          color: Colors.white,
                                          size: 26,
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ──────────────────────────────────────────────
// Single page widget
// ──────────────────────────────────────────────
class _OnboardingPage extends StatelessWidget {
  final _OnboardingData data;
  const _OnboardingPage({required this.data});

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        // Background image
        Image.asset(data.background, fit: BoxFit.cover),

        // Card — frosted glass, Figma: top:275, left:32, w:343, h:371, radius:16
        Positioned(
          top: 275,
          left: 32,
          width: 343,
          height: 371,
          child: DecoratedBox(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              boxShadow: const [
                BoxShadow(
                  color: Color(0x4D000000),
                  offset: Offset(0, 8),
                  blurRadius: 32,
                ),
              ],
            ),
            child: CustomPaint(
              foregroundPainter: _CardBorderPainter(color: data.iconColor),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(16),
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
                  child: Container(
                    width: 343,
                    height: 371,
                    decoration: const BoxDecoration(
                      color: Colors.transparent,
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(16),
                        topRight: Radius.circular(16),
                        bottomLeft: Radius.circular(16),
                        bottomRight: Radius.circular(16),
                      ),
                    ),
                    child: Stack(
                      children: [
                        // ── Icon ──
                        Positioned(
                          top: 26.67,
                          left: 24.67,
                          child: Container(
                            width: 48,
                            height: 48,
                            decoration: BoxDecoration(
                              color: data.iconColor.withValues(alpha: 0.20),
                              borderRadius: BorderRadius.circular(14),
                            ),
                            child: Icon(
                              data.icon,
                              color: data.iconColor,
                              size: 28,
                            ),
                          ),
                        ),

                        // ── Badge ──
                        Positioned(
                          top: 26.67 + 48 + 14,
                          left: 24.67,
                          child: Container(
                            width: 140,
                            height: 30,
                            decoration: BoxDecoration(
                              color: data.iconColor.withValues(alpha: 0.12),
                              borderRadius: BorderRadius.circular(9999),
                              border: Border.all(
                                color: data.iconColor.withValues(alpha: 0.45),
                                width: 1,
                              ),
                            ),
                            alignment: Alignment.center,
                            child: Text(
                              data.badge,
                              style: GoogleFonts.dmSans(
                                color: data.iconColor,
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                                letterSpacing: 0,
                              ),
                            ),
                          ),
                        ),

                        // ── Title ──
                        Positioned(
                          top: 152,
                          left: 24.67,
                          width: 296,
                          child: Text(
                            data.title,
                            style: GoogleFonts.dmSans(
                              color: Colors.white,
                              fontSize: 25,
                              fontWeight: FontWeight.w600,
                              height: 22.1 / 25,
                              letterSpacing: 0,
                            ),
                          ),
                        ),

                        // ── Description ──
                        Positioned(
                          top: 211,
                          left: 24.67,
                          width: 241,
                          height: 121,
                          child: Text(
                            data.description,
                            style: GoogleFonts.dmSans(
                              color: Colors.white.withValues(alpha: 0.75),
                              fontSize: 20,
                              fontWeight: FontWeight.w400,
                              height: 30 / 20,
                              letterSpacing: 0,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ), // Positioned
      ],
    );
  }
}

// ──────────────────────────────────────────────
// Asymmetric rounded-rect border painter.
// Top edge: full opacity, 2.67 px.
// Other edges: 40 % opacity, 0.67 px.
// ──────────────────────────────────────────────
class _CardBorderPainter extends CustomPainter {
  final Color color;
  const _CardBorderPainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    const r = 16.0;
    final rrect = RRect.fromRectAndRadius(
      Rect.fromLTWH(0, 0, size.width, size.height),
      const Radius.circular(r),
    );

    // 1. Thin border all the way around (sides + bottom)
    canvas.drawRRect(
      rrect,
      Paint()
        ..color = color.withValues(alpha: 0.4)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 0.67,
    );

    // 2. Overdraw top arc with thick accent stroke
    canvas.save();
    canvas.clipRect(Rect.fromLTWH(0, 0, size.width, r + 1.34));
    canvas.drawRRect(
      rrect,
      Paint()
        ..color = color
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.67,
    );
    canvas.restore();
  }

  @override
  bool shouldRepaint(_CardBorderPainter old) => old.color != color;
}
