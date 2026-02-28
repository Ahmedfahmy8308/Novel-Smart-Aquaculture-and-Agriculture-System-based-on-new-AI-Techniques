import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/widgets/custom_card.dart';

class CropHealthScreen extends ConsumerWidget {
  const CropHealthScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Crop Health')),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            CustomCard(
              child: Column(
                children: [
                  Icon(Icons.eco, size: 60, color: Colors.green),
                  SizedBox(height: 16),
                  Text(
                    'Crop Health Analysis',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text('Analyze crop health and detect plant diseases'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
