import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/widgets/custom_card.dart';

class OptimizationScreen extends ConsumerWidget {
  const OptimizationScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Energy Optimization')),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            CustomCard(
              child: Column(
                children: [
                  Icon(Icons.tune, size: 60, color: Colors.green),
                  SizedBox(height: 16),
                  Text(
                    'Energy Optimization',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text('Optimize energy usage with AI recommendations'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
