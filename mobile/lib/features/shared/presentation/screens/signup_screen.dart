import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../../core/utils/helpers.dart';

// ────────────────────────────────────────────────────────────────
// Design constants
// ────────────────────────────────────────────────────────────────
const _kFieldBg = Color(0xFF0D2B1A);
const _kFieldBorder = Color(0xFF2A5C2A);
const _kGreen = Color(0xFF3A8C2F);
const _kWhite = Colors.white;
const _kSubtitle = Color(0xFF7A9A7A);
const _kLabel = Color(0xFFCCDDCC);
const _kPlaceholder = Color(0xFF4A6E4A);
const _kLink = Color(0xFF4CAF50);

class SignupScreen extends ConsumerStatefulWidget {
  const SignupScreen({super.key});

  @override
  ConsumerState<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends ConsumerState<SignupScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;
  bool _agreedToTerms = false;
  bool _isLoading = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _signup() async {
    if (!(_formKey.currentState?.validate() ?? false)) return;

    if (!_agreedToTerms) {
      Helpers.showError(
        context,
        'Please agree to the Terms and Privacy Policy',
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      // TODO: Implement signup logic with API
      await Future.delayed(const Duration(seconds: 2));

      if (mounted) {
        Helpers.showSuccess(context, 'Account created successfully');
        context.go('/login');
      }
    } catch (e) {
      if (mounted) {
        Helpers.showError(context, 'Signup failed: $e');
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
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      const SizedBox(height: 40),
                      // Logo image
                      Image.asset(
                        'assets/images/Logo Section (2).png',
                        height: 70,
                        fit: BoxFit.contain,
                      ),
                      const SizedBox(height: 10),

                      // Container directly below logo with no spacing
                      Container(
                        width: 340,
                        constraints: const BoxConstraints(minHeight: 634),
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
                                'Create Your Account',
                                style: GoogleFonts.dmSans(
                                  color: _kWhite,
                                  fontSize: 28,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Join the future of AI-driven\nagriculture',
                              style: GoogleFonts.dmSans(
                                color: _kSubtitle,
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                                height: 1.4,
                              ),
                            ),
                            const SizedBox(height: 32),
                            Text(
                              'Full Name',
                              style: GoogleFonts.dmSans(
                                color: _kLabel,
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            const SizedBox(height: 8),
                            SizedBox(
                              height: 50,
                              child: _SignupField(
                                controller: _nameController,
                                hint: 'Enter your full name',
                                validator:
                                    (value) =>
                                        Helpers.validateRequired(value, 'Name'),
                              ),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'Email Address',
                              style: GoogleFonts.dmSans(
                                color: _kLabel,
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            const SizedBox(height: 8),
                            SizedBox(
                              height: 50,
                              child: _SignupField(
                                controller: _emailController,
                                hint: 'farmer@agromind.ai',
                                prefixIcon: Icons.mail_outline_rounded,
                                keyboardType: TextInputType.emailAddress,
                                validator: Helpers.validateEmail,
                              ),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'Password',
                              style: GoogleFonts.dmSans(
                                color: _kLabel,
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            const SizedBox(height: 8),
                            SizedBox(
                              height: 50,
                              child: _SignupField(
                                controller: _passwordController,
                                hint: '••••••••',
                                prefixIcon: Icons.lock_outline_rounded,
                                obscureText: _obscurePassword,
                                validator: Helpers.validatePassword,
                                suffixIcon: GestureDetector(
                                  onTap:
                                      () => setState(
                                        () =>
                                            _obscurePassword =
                                                !_obscurePassword,
                                      ),
                                  child: Icon(
                                    _obscurePassword
                                        ? Icons.visibility_outlined
                                        : Icons.visibility_off_outlined,
                                    color: _kSubtitle,
                                    size: 20,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(height: 16),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                SizedBox(
                                  width: 20,
                                  height: 20,
                                  child: Checkbox(
                                    value: _agreedToTerms,
                                    onChanged:
                                        (v) => setState(
                                          () => _agreedToTerms = v ?? false,
                                        ),
                                    side: const BorderSide(
                                      color: _kFieldBorder,
                                      width: 1.5,
                                    ),
                                    fillColor: WidgetStateProperty.resolveWith(
                                      (states) =>
                                          states.contains(WidgetState.selected)
                                              ? _kGreen
                                              : Colors.transparent,
                                    ),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: RichText(
                                    text: TextSpan(
                                      style: GoogleFonts.dmSans(
                                        color: _kLabel,
                                        fontSize: 13,
                                        height: 1.5,
                                      ),
                                      children: [
                                        const TextSpan(text: 'I agree to the '),
                                        WidgetSpan(
                                          child: GestureDetector(
                                            onTap: () {
                                              // TODO: Navigate to Terms of Service
                                            },
                                            child: Text(
                                              'Terms of Service',
                                              style: GoogleFonts.dmSans(
                                                color: _kLink,
                                                fontSize: 13,
                                                height: 1.5,
                                                fontWeight: FontWeight.w600,
                                              ),
                                            ),
                                          ),
                                        ),
                                        const TextSpan(text: ' and '),
                                        WidgetSpan(
                                          child: GestureDetector(
                                            onTap: () {
                                              // TODO: Navigate to Privacy Policy
                                            },
                                            child: Text(
                                              'Privacy Policy',
                                              style: GoogleFonts.dmSans(
                                                color: _kLink,
                                                fontSize: 13,
                                                height: 1.5,
                                                fontWeight: FontWeight.w600,
                                              ),
                                            ),
                                          ),
                                        ),
                                        const TextSpan(text: '.'),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
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
                                onPressed: _isLoading ? null : _signup,
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
                                              'Sign In',
                                              style: GoogleFonts.dmSans(
                                                fontSize: 16,
                                                fontWeight: FontWeight.w600,
                                              ),
                                            ),
                                            const SizedBox(width: 8),
                                            const Icon(
                                              Icons.arrow_forward_rounded,
                                              size: 20,
                                            ),
                                          ],
                                        ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 32),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Already have an account? ',
                            style: GoogleFonts.dmSans(
                              color: _kSubtitle,
                              fontSize: 14,
                            ),
                          ),
                          GestureDetector(
                            onTap: () => context.go('/login'),
                            child: Text(
                              'Login',
                              style: GoogleFonts.dmSans(
                                color: _kLink,
                                fontSize: 14,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 28),
                    ],
                  ),
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
// Reusable text field — private to this file
// ────────────────────────────────────────────────────────────────
class _SignupField extends StatelessWidget {
  final TextEditingController controller;
  final String hint;
  final IconData? prefixIcon;
  final bool obscureText;
  final TextInputType keyboardType;
  final String? Function(String?)? validator;
  final Widget? suffixIcon;

  const _SignupField({
    required this.controller,
    required this.hint,
    this.prefixIcon,
    this.obscureText = false,
    this.keyboardType = TextInputType.text,
    this.validator,
    this.suffixIcon,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      obscureText: obscureText,
      keyboardType: keyboardType,
      validator: validator,
      style: GoogleFonts.dmSans(color: _kWhite, fontSize: 14),
      decoration: InputDecoration(
        hintText: hint,
        hintStyle: GoogleFonts.dmSans(color: _kPlaceholder, fontSize: 14),
        prefixIcon:
            prefixIcon != null
                ? Icon(prefixIcon, color: _kSubtitle, size: 20)
                : null,
        prefixIconConstraints:
            prefixIcon != null
                ? const BoxConstraints(minWidth: 32, minHeight: 20)
                : null,
        suffixIcon:
            suffixIcon != null
                ? Padding(
                  padding: const EdgeInsets.only(right: 12),
                  child: suffixIcon,
                )
                : null,
        filled: true,
        fillColor: _kFieldBg,
        contentPadding: EdgeInsets.symmetric(
          vertical: 16,
          horizontal: prefixIcon != null ? 8 : 12,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: Color(0x1AFFFFFF), width: 1),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: Color(0x1AFFFFFF), width: 1),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: Colors.redAccent, width: 1),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: Colors.redAccent, width: 1.5),
        ),
      ),
    );
  }
}
