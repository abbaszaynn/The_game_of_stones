
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold font-headline text-white">Settings</h1>

            <Card className="bg-card/30 backdrop-blur-sm border-white/10 max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-white">Admin Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value="admin@gameofstones.world" disabled className="bg-white/5 border-white/10" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Change Password</Label>
                        <Input id="password" type="password" placeholder="New Password" className="bg-white/5 border-white/10" />
                    </div>
                    <div className="pt-2">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 disabled:opacity-50" disabled>
                            Save Changes (Auth Disabled)
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
