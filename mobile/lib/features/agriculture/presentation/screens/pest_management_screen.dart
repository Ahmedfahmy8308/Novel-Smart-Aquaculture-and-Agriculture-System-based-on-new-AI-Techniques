import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/widgets/custom_card.dart';

class PestManagementScreen extends ConsumerWidget {
  const PestManagementScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Pest Management')),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            CustomCard(
              child: Column(
                children: [
                  Icon(Icons.bug_report, size: 60, color: Colors.red),
                  SizedBox(height: 16),
                  Text(
                    'Pest Management',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text('Identify pests and get treatment recommendations'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
