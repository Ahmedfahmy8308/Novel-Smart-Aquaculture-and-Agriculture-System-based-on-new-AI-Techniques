import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../../core/utils/helpers.dart';

// ────────────────────────────────────────────────────────────────
// Design constants
// ────────────────────────────────────────────────────────────────
const _kFieldBg = Color(0xFF0D2B1A);
const _kFieldBorder = Color(0xFF2A5C2A);
const _kWhite = Colors.white;
const _kSubtitle = Color(0xFF7A9A7A);

class VerifyEmailScreen extends ConsumerStatefulWidget {
  final String email;

  const VerifyEmailScreen({super.key, required this.email});

  @override
  ConsumerState<VerifyEmailScreen> createState() => _VerifyEmailScreenState();
}

class _VerifyEmailScreenState extends ConsumerState<VerifyEmailScreen> {
  final List<TextEditingController> _controllers = List.generate(
    6,
    (_) => TextEditingController(),
  );
  final List<FocusNode> _focusNodes = List.generate(6, (_) => FocusNode());
  bool _isLoading = false;

  @override
  void dispose() {
    for (var controller in _controllers) {
      controller.dispose();
    }
    for (var node in _focusNodes) {
      node.dispose();
    }
    super.dispose();
  }

  String get _verificationCode {
    return _controllers.map((c) => c.text).join();
  }

  Future<void> _verifyCode() async {
    if (_verificationCode.length != 6) {
      Helpers.showError(context, 'Please enter all 6 digits');
      return;
    }

    setState(() => _isLoading = true);

    try {
      // TODO: Implement verification logic with API
      await Future.delayed(const Duration(seconds: 2));

      if (mounted) {
        Helpers.showSuccess(context, 'Email verified successfully');
        context.go('/login');
      }
    } catch (e) {
      if (mounted) {
        Helpers.showError(context, 'Verification failed: $e');
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              'assets/images/auth_background.png',
              fit: BoxFit.cover,
            ),
          ),
          SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  children: [
                    const SizedBox(height: 40),
                    // Logo image
                    Image.asset(
                      'assets/images/Logo Section (2).png',
                      height: 70,
                      fit: BoxFit.contain,
                    ),
                    const SizedBox(height: 32),
                    // Verification container
                    Container(
                      width: 340,
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [Color(0xFF0D2B1A), Color(0xFF123524)],
                        ),
                        borderRadius: BorderRadius.circular(24),
                        border: Border.all(
                          color: _kFieldBorder.withValues(alpha: 0.35),
                          width: 1,
                        ),
                      ),
                      padding: const EdgeInsets.fromLTRB(40, 40, 40, 32),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Center(
                            child: Text(
                              'Verify Your Email',
                              style: GoogleFonts.dmSans(
                                color: _kWhite,
                                fontSize: 28,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Enter the 6-digit code sent to\n${widget.email}',
                            style: GoogleFonts.dmSans(
                              color: _kSubtitle,
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                              height: 1.4,
                            ),
                          ),
                          const SizedBox(height: 32),
                          // 6-digit code input
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: List.generate(
                              6,
                              (index) => _CodeInput(
                                controller: _controllers[index],
                                focusNode: _focusNodes[index],
                                onChanged: (value) {
                                  if (value.isNotEmpty && index < 5) {
                                    _focusNodes[index + 1].requestFocus();
                                  }
                                  if (value.isEmpty && index > 0) {
                                    _focusNodes[index - 1].requestFocus();
                                  }
                                },
                              ),
                            ),
                          ),
                          const SizedBox(height: 32),
                          Container(
                            width: double.infinity,
                            height: 50,
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(
                                colors: [
                                  Color(0xFF2E7D32),
                                  Color(0xFF4CAF50),
                                  Color(0xFF388E3C),
                                ],
                              ),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: ElevatedButton(
                              onPressed: _isLoading ? null : _verifyCode,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.transparent,
                                shadowColor: Colors.transparent,
                                foregroundColor: _kWhite,
                                disabledBackgroundColor: Colors.transparent,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                elevation: 0,
                              ),
                              child:
                                  _isLoading
                                      ? const SizedBox(
                                        width: 20,
                                        height: 20,
                                        child: CircularProgressIndicator(
                                          color: _kWhite,
                                          strokeWidth: 2,
                                        ),
                                      )
                                      : Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          Text(
                                            'Verify Code',
                                            style: GoogleFonts.dmSans(
                                              fontSize: 16,
                                              fontWeight: FontWeight.w600,
                                            ),
                                          ),
                                          const SizedBox(width: 8),
                                          const Icon(
                                            Icons.check_circle_outline_rounded,
                                            size: 20,
                                          ),
                                        ],
                                      ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 28),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ────────────────────────────────────────────────────────────────
// Single code input widget
// ────────────────────────────────────────────────────────────────
class _CodeInput extends StatelessWidget {
  final TextEditingController controller;
  final FocusNode focusNode;
  final ValueChanged<String> onChanged;

  const _CodeInput({
    required this.controller,
    required this.focusNode,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 42,
      height: 50,
      child: TextFormField(
        controller: controller,
        focusNode: focusNode,
        textAlign: TextAlign.center,
        keyboardType: TextInputType.number,
        maxLength: 1,
        onChanged: onChanged,
        style: GoogleFonts.dmSans(
          color: _kWhite,
          fontSize: 20,
          fontWeight: FontWeight.w600,
        ),
        inputFormatters: [FilteringTextInputFormatter.digitsOnly],
        decoration: InputDecoration(
          counterText: '',
          filled: true,
          fillColor: _kFieldBg,
          contentPadding: EdgeInsets.zero,
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
            borderSide: const BorderSide(color: Color(0x1AFFFFFF), width: 1),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
            borderSide: const BorderSide(color: Color(0xFF4CAF50), width: 2),
          ),
        ),
      ),
    );
  }
}
