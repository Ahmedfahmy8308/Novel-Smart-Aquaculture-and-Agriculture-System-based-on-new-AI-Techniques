import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/widgets/custom_card.dart';

class FeedingManagementScreen extends ConsumerWidget {
  const FeedingManagementScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Feeding Management')),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            CustomCard(
              child: Column(
                children: [
                  Icon(Icons.schedule, size: 60, color: Colors.orange),
                  SizedBox(height: 16),
                  Text(
                    'Feeding Management',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text('Manage feeding schedules and nutrition plans'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
