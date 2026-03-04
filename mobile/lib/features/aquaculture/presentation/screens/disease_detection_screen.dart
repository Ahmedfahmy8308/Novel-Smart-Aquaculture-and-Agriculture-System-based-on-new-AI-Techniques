import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../../../core/utils/helpers.dart';

class DiseaseDetectionScreen extends ConsumerStatefulWidget {
  const DiseaseDetectionScreen({super.key});

  @override
  ConsumerState<DiseaseDetectionScreen> createState() =>
      _DiseaseDetectionScreenState();
}

class _DiseaseDetectionScreenState
    extends ConsumerState<DiseaseDetectionScreen> {
  bool _isAnalyzing = false;

  Future<void> _analyzeImage() async {
    final image = await Helpers.pickImage();
    if (image == null) return;

    setState(() => _isAnalyzing = true);

    try {
      // TODO: Implement disease detection using FishServiceApi
      await Future.delayed(const Duration(seconds: 2)); // Mock delay

      if (mounted) {
        Helpers.showSuccess(context, 'Disease analysis completed');
      }
    } catch (e) {
      if (mounted) {
        Helpers.showError(context, 'Analysis failed: $e');
      }
    } finally {
      if (mounted) {
        setState(() => _isAnalyzing = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Fish Disease Detection')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.pest_control, size: 80, color: Colors.red),
            const SizedBox(height: 24),
            const Text(
              'Fish Disease Detection',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            const Text(
              'Take a photo of fish to detect diseases and health issues',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 32),
            CustomButton(
              text: _isAnalyzing ? 'Analyzing...' : 'Analyze Fish',
              icon: Icons.camera_alt,
              isLoading: _isAnalyzing,
              onPressed: _analyzeImage,
              width: double.infinity,
            ),
          ],
        ),
      ),
    );
  }
}
